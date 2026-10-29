import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainingSessionsService } from './training-sessions.service.js';
import { TrainingSessionsController } from './training-sessions.controller.js';

import { TrainingSession } from './entities/training-session.entity.js';
import { TrainingPlan } from '../training/entities/training-plan.entity.js';
import { User } from '../users/entities/user.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingSession,
      TrainingPlan,
      User
    ]),
  ],
  providers: [TrainingSessionsService],
  controllers: [TrainingSessionsController],
})
export class TrainingSessionsModule {}