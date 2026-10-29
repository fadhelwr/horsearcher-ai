import { Body, Controller, Post } from '@nestjs/common';

import { TrainingSessionsService } from './training-sessions.service.js';
import { CreateTrainingSessionDto } from './dto/create-training-session.dto.js';

@Controller('training-sessions')
export class TrainingSessionsController {
  constructor(
    private readonly trainingSessionsService: TrainingSessionsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateTrainingSessionDto,
  ) {
    return this.trainingSessionsService.create(dto);
  }
}