import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";

import { TransactionService } from "./transaction.service";

import { JwtGuard } from "../auth/guards/jwt/jwt.guard";

import { CurrentUser } from "../auth/decorators/current-user.decorator";

import { CreateTransactionDto,CreateTransferDto } from "./dto/create-transaction.dto";


@Controller("transactions")
@UseGuards(JwtGuard)
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  create(
    @CurrentUser() user: any,
    @Body()
    dto: CreateTransactionDto,
  ) {
    return this.transactionService.create(
      dto,
      user.id
    );
  }






  @Post("transfer")
createTransfer(
  @Body()
  dto: CreateTransferDto,

  @CurrentUser()
  user: any,
) {
  return this.transactionService.transfer(
    dto,
    user.id,
  );
}


  @Get("overview")
getOverview(
  @CurrentUser() user: any,
) {
  return this.transactionService.getOverview(
    user.id,
  );
}

  @Get("recent")
  findAll(
    @CurrentUser() user: any,
  ) {
    return this.transactionService.findAll(
      user.id,
    );
  }
}