import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtGuard } from './../auth/guards/jwt/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/common';



@Controller('account')
@UseGuards(JwtGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

@Post()
create(
  @CurrentUser() user: any,
  @Body() dto: CreateAccountDto,
) {
  return this.accountService.create(
    user.id,
    dto
  );
}

@Get("search")
searchAccounts(
  @Query("email") email: string,
) {
  return this.accountService.searchByEmail(
    email,
  );
}

  @Get()
  findAll(
    @CurrentUser() user: any,
  )
   {
    return this.accountService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.accountService.findOne(id, user.id);
  }

@Patch(":id")
update(
  @CurrentUser() user: any,
  @Param("id") id: string,
  @Body() dto: UpdateAccountDto,
) {
  return this.accountService.update(
    id,
    user.id,
    dto,
  );
}

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.accountService.delete(id, user.id);
  }
}
