import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { DashboardService } from './dashboard.service.js';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getDashboard(@Req() req: any) {
    return this.dashboardService.getDashboard(
      req.user.userId,
    );
  }
}