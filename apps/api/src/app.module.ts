import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationModule } from './notification/notification.module';
import { StripeModule } from './stripe/stripe.module';



@Module({
  imports: [UserModule, AuthModule,  ConfigModule.forRoot({
    isGlobal: true,
  }),

  PrismaModule,
  AuthModule,

  AccountModule,

  TransactionModule,

  DashboardModule,

  NotificationModule,

  StripeModule,],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
