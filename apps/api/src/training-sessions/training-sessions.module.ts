import { Module } from '@nestjs/common';
import { TrainingSessionsService } from './training-sessions.service.js';
import { TrainingSessionsController } from './training-sessions.controller.js';

@Module({
  providers: [TrainingSessionsService],
  controllers: [TrainingSessionsController]
})
export class TrainingSessionsModule {}
