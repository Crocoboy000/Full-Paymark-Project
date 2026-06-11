import { Global, Module } from "@nestjs/common";
import { UserService } from "../src/user/user.service";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService, UserService],
  exports: [PrismaService],
})
export class PrismaModule {}