import {
  Controller,
  Get,
  UseGuards,
} from "@nestjs/common";

import { DashboardService } from "./dashboard.service";

import { JwtGuard } from "../auth/guards/jwt/jwt.guard";

import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("dashboard")
@UseGuards(JwtGuard)
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}


  @Get("summary")
  getSummary(
    @CurrentUser() user: any,
  ) {
    return this.dashboardService.getSummary(
      user.id,
    );
  }


  @Get("overview")
  getOverview(
    @CurrentUser() user: any,
  ) {
    return this.dashboardService.getOverview(
      user.id,
    );
  }
}