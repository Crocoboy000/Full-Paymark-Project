import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';



@Module({
  imports: [UserModule, AuthModule,  ConfigModule.forRoot({
    isGlobal: true,
  }),

  PrismaModule,],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
