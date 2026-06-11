import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

import { JwtGuard } from "./guards/jwt/jwt.guard";

import { CurrentUser } from "./decorators/current-user.decorator";
import { ZodValidationPipe } from "./pipes/zod-validation.pip";
import { RegisterSchema } from './../../../../packages/validations/src/auth/register.schema';
import { LoginSchema } from './../../../../packages/validations/src/auth/login.schema';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post("register")
  register(
    @Body(
        new ZodValidationPipe(
            RegisterSchema,
        )
    ) dto: RegisterDto,
  ) {
    return this.authService.register(dto);
  }

  @Post("login")
  login(
    @Body(
        new ZodValidationPipe(
            LoginSchema,
        )
    ) dto: LoginDto,
  ) {
    return this.authService.login(dto);
  }

@Get("me")
@UseGuards(JwtGuard)
me(
  @CurrentUser() user: any,
) {
  return user
}
}