import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from './dto/update-account.dto';
import { BadRequestException } from "@nestjs/common";



@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
        userId: string,
        dto: CreateAccountDto,
  ) {
    return this.prisma.account.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.account.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(
    id: string,
    userId: string,
  ) {
    const account =
      await this.prisma.account.findUnique({
        where: {
          id,
        },
      });

    if (!account) {
      throw new NotFoundException(
        "Account not found",
      );
    }

    if (account.userId !== userId) {
      throw new ForbiddenException();
    }

    return account;
  }


  async update(
  accountId: string,
  userId: string,
  dto: UpdateAccountDto,
) {
  const account =
    await this.findOne(
      accountId,
      userId,
    );

  return this.prisma.account.update({
    where: {
      id: account.id,
    },

    data: {
      name: dto.name,
      type: dto.type,
    },
  });
}


  async delete(
    id: string,
    userId: string,
  ) {
    const account =
      await this.findOne(id, userId);

    await this.prisma.account.delete({
      where: {
        id: account.id,
      },
    });

    return {
      message:
        "Account deleted successfully",
    };
  }



  async searchByEmail(
    email: string,
  ) {
    const recipient =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
  
          accounts: {
            select: {
              id: true,
              name: true,
              type: true,
              balance: true,
            },
          },
        },
      });
  
    if (!recipient) {
      return {
        message: "User not found",
      };
    }

    return {
      message: "Recipient found successfully",
      data: recipient,
    };
  }
}
