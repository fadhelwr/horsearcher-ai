import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainingController } from './training.controller.js';
import { TrainingService } from './training.service.js';
import { TrainingPlan } from './entities/training-plan.entity.js';
import { TrainingSession } from '../training-sessions/entities/training-session.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingPlan,
      TrainingSession
    ]),
  ],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}