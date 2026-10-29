import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller.js';
import { DashboardService } from './dashboard.service.js';

import { User } from '../users/entities/user.entity.js';
import { TrainingSession } from '../training-sessions/entities/training-session.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      TrainingSession,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}