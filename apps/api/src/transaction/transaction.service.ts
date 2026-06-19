import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, TransactionStatus, TransactionType } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateTransferDto } from './dto/create-transaction.dto';
import type { DashboardChart } from '@paymark/types';



@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}


  async create(dto: CreateTransactionDto, authenticatedUserId: string) {
    const amount = new Prisma.Decimal(dto.amount);
    if (amount.lte(0)) throw new BadRequestException('Amount must be > 0');

    if ( dto.type === TransactionType.TRANSFER && !dto.receiverAccountId) {
      throw new BadRequestException('receiverAccountId is required for transfers');


    }

    if (dto.type === TransactionType.INCOME) {
  throw new ForbiddenException(
    "Income transactions can only be created by Stripe",
  );
}

    return this.prisma.$transaction(async (tx) => {
      const sender = await tx.account.findUnique({ where: { id: dto.senderAccountId }});
      if (!sender) throw new NotFoundException('Sender account not found');

      if (sender.userId !== authenticatedUserId) throw new ForbiddenException('Not owner of sender account');

      let receiver: Awaited<
  ReturnType<typeof tx.account.findUnique>
> = null;

      if (dto.receiverAccountId) {
        receiver = await tx.account.findUnique({ where: { id: dto.receiverAccountId }});
        if (!receiver) throw new NotFoundException('Receiver account not found');
      }

      if (
        dto.type === TransactionType.TRANSFER &&
        dto.senderAccountId === dto.receiverAccountId
      ) {
        throw new BadRequestException(
          "Cannot transfer to the same account",
        );
      }

          if (
      dto.type !== TransactionType.TRANSFER &&
      dto.receiverAccountId
    ) {
      throw new BadRequestException(
        "receiverAccountId only allowed for transfers",
      );
    }


      if (dto.type === TransactionType.TRANSFER || dto.type === TransactionType.EXPENSE) {
        if (sender.balance.lt(amount)) throw new BadRequestException('Insufficient funds');
      }

      if (dto.type === TransactionType.TRANSFER) {
        await tx.account.update({
          where: { id: sender.id },
          data: { balance: sender.balance.minus(amount) },
        });
        await tx.account.update({
          where: { id: receiver!.id },
          data: { balance: receiver!.balance.plus(amount) },
        });
      } else if (dto.type === TransactionType.EXPENSE) {
        await tx.account.update({
          where: { id: sender.id },
          data: { balance: sender.balance.minus(amount) },
        });
      } else if (dto.type === TransactionType.INCOME) {
        await tx.account.update({
          where: { id: sender.id },
          data: { balance: sender.balance.plus(amount) },
        });
      }

      const created = await tx.transaction.create({
        data: {
          amount,
          category: dto.category,
          type:dto.type,
          senderAccountId: dto.senderAccountId,
          receiverAccountId: dto.receiverAccountId ?? null,
          description: dto.description,
          status: TransactionStatus.COMPLETED,
          externalReference: dto.externalReference,
          processedAt: new Date(),
        },
      });

      const formattedAmount = `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

      await tx.notification.create({
        data: {
          userId: sender.userId,
          title: 'Transfer Sent',
          message: receiver
            ? `You sent ${formattedAmount} from "${sender.name}" to ${receiver.name}. ${dto.description ? `Note: ${dto.description}` : ''}`
            : `You sent ${formattedAmount} from "${sender.name}". ${dto.description ? `Note: ${dto.description}` : ''}`,
        },
      });

      if (receiver) {
        await tx.notification.create({
          data: {
            userId: receiver.userId,
            title: 'Money Received',
            message: `You received ${formattedAmount} into "${receiver.name}" from ${sender.name}. ${dto.description ? `Note: ${dto.description}` : ''}`,
          },
        });
      }

      return created;
    });
  }

  async findAll(userId: string) {
  return this.prisma.transaction.findMany({
    where: {
      OR: [
        {
          senderAccount: {
            userId,
          },
        },
        {
          receiverAccount: {
            userId,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}


async transfer(
  dto: CreateTransferDto,
  authenticatedUserId: string,
) {
  const senderAccountId = dto.senderAccountId;
  const sender =
    await this.prisma.account.findUnique({
      where: { id: senderAccountId },
    });

  if (!sender) {
    throw new NotFoundException(
      "Sender account not found",
    );
  }

  if (sender.userId !== authenticatedUserId) {
    throw new ForbiddenException('Not owner of sender account');
  }

  return this.create(
    {
      senderAccountId:
        sender.id,

      receiverAccountId:
        dto.receiverAccountId,

      amount: dto.amount,

      description:
        dto.description,

      type: TransactionType.TRANSFER,
    },
    authenticatedUserId,
  );
}

async getOverview(userId: string) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
 
  const accounts = await this.prisma.account.findMany({
    where: { userId },
    select: { id: true },
  });
 
  const accountIds = accounts.map((account) => account.id);
 
  const transactions = await this.prisma.transaction.findMany({
    where: {
      OR: [
        { senderAccountId: { in: accountIds } },
        { receiverAccountId: { in: accountIds } },
      ],
      createdAt: { gte: startDate },
    },
    select: {
      amount: true,
      type: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
 
  const grouped = new Map<string, { income: number; expenses: number }>();
 
  for (const tx of transactions) {
    const key = tx.createdAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
 
    const current = grouped.get(key) ?? { income: 0, expenses: 0 };
 
    if (tx.type === "INCOME") {
      current.income += Number(tx.amount);
    } else {
      current.expenses += Number(tx.amount);
    }
 
    grouped.set(key, current);
  }
 
  const chartData: DashboardChart[] = [];
 
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
 
    const key = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
 
    chartData.push({
      date: key,
      income: grouped.get(key)?.income ?? 0,
      expenses: grouped.get(key)?.expenses ?? 0,
    });
  }
 
  return {
    data: chartData,
    transactionCount: transactions.length,
  };
}

}