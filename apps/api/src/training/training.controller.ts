import { Controller, Get } from '@nestjs/common';
import { TrainingService } from './training.service.js';

@Controller('training-plans')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) {}

  @Get()
  async findAll() {
    return this.trainingService.findAll();
  }
}