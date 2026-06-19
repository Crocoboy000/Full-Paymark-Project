import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";

import { TransactionType } from "@prisma/client";

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}


  async getSummary(
    userId: string,
  ) {
    const accounts =
      await this.prisma.account.findMany({
        where: {
          userId,
        },
      });

    const accountIds =
      accounts.map(
        (account) => account.id,
      );

    const transactions =
      await this.prisma.transaction.findMany({
        where: {
          senderAccountId: {
            in: accountIds,
          },
        },
      });

    const totalBalance =
      accounts.reduce(
        (sum, account) =>
          sum + Number(account.balance),
        0,
      );

    const totalIncome =
      transactions
        .filter(
          (tx) =>
            tx.type ===
            TransactionType.INCOME,
        )
        .reduce(
          (sum, tx) =>
            sum + Number(tx.amount),
          0,
        );

    const totalExpenses =
      transactions
        .filter(
          (tx) =>
            tx.type ===
            TransactionType.EXPENSE,
        )
        .reduce(
          (sum, tx) =>
            sum + Number(tx.amount),
          0,
        );

    return {
      totalBalance,
      totalIncome,
      totalExpenses,
      netWorth: totalBalance,
    };
  }


  
  async getOverview(
    userId: string,
  ) {
    const accounts =
      await this.prisma.account.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
        },
      });

    const accountIds =
      accounts.map(
        (account) => account.id,
      );

    const transactions =
      await this.prisma.transaction.findMany({
        where: {
          senderAccountId: {
            in: accountIds,
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    const grouped = new Map<
      string,
      {
        income: number;
        expenses: number;
      }
    >();

    for (const transaction of transactions) {
      const date =
        transaction.createdAt.toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
          },
        );

      if (!grouped.has(date)) {
        grouped.set(date, {
          income: 0,
          expenses: 0,
        });
      }

      const current =
        grouped.get(date)!;

      if (
        transaction.type ===
        TransactionType.INCOME
      ) {
        current.income += Number(
          transaction.amount,
        );
      }

      if (
        transaction.type ===
        TransactionType.EXPENSE
      ) {
        current.expenses += Number(
          transaction.amount,
        );
      }
    }

    return Array.from(
      grouped.entries(),
    ).map(([date, values]) => ({
      date,
      income: values.income,
      expenses: values.expenses,
    }));
  }
}