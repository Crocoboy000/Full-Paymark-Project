import { Module } from "@nestjs/common";

import { JwtModule } from "@nestjs/jwt";

import { ConfigModule } from "@nestjs/config";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { JwtStrategy } from "./strategies/jwt.strategy";


@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret:
        process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: "15m",
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy,
  ],
})
export class AuthModule {}