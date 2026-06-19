import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

import { PrismaService } from "../../prisma/prisma.service";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {



    const existing =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (existing) {
      throw new BadRequestException(
        "Email already exists",
      );
    }

    const passwordHash =
      await bcrypt.hash(dto.password, 12);

    const user =
      await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          passwordHash,
          accounts: {
            create: {
              name: "Main Account",
              type: "CHECKING",
            },
          },
        },
        include: {
          accounts: true,
        },
      });

    const mainAccount = user.accounts[0];

    await this.prisma.notification.create({
      data: {
        userId: user.id,
        title: 'Account Created',
        message: `Your "${mainAccount.name}" (Checking) is ready. You can start sending and receiving money right away.`,
      },
    });

    const token =
      await this.generateAccessToken(
        user.id,
        user.email,
      );


    return {
      user,
      accessToken: token,
    };
  }

  async login(dto: LoginDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        "Email not found",
      );
    }

    const match = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!match) {
      throw new UnauthorizedException(
        "Invalid credentials",
      );
    }

    const token =
      await this.generateAccessToken(
        user.id,
        user.email,
      );

    return {
      user,
      accessToken: token,
    };
  }

  async generateAccessToken(
    userId: string,
    email: string,
  ) {
    return this.jwt.signAsync({
      sub: userId,
      email,
    },{
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: "15m",
    });
  }
}