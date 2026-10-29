import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrainingPlan } from './entities/training-plan.entity.js';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainingPlan)
    private readonly trainingRepository: Repository<TrainingPlan>,
  ) {}

  async findAll() {
    return this.trainingRepository.find({
      order: {
        targetLevel: 'ASC',
      },
    });
  }
}