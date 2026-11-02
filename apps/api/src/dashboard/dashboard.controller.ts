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
  @Get()
getDashboard(@Req() req: any) {
  console.log('REQ USER:', req.user);

  return this.dashboardService.getDashboard(
    req.user.userId,
  );
}
}