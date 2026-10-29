import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrainingSession } from './entities/training-session.entity.js';
import { CreateTrainingSessionDto } from './dto/create-training-session.dto.js';
import { TrainingPlan } from '../training/entities/training-plan.entity.js';
import { User } from '../users/entities/user.entity.js';

@Injectable()
export class TrainingSessionsService {
  constructor(
    @InjectRepository(TrainingSession)
    private readonly trainingSessionRepository: Repository<TrainingSession>,

    @InjectRepository(TrainingPlan)
    private readonly trainingPlanRepository: Repository<TrainingPlan>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private calculateLevel(xp: number): number {
    if (xp >= 1000) return 4;
    if (xp >= 500) return 3;
    if (xp >= 250) return 2;
    if (xp >= 100) return 1;

    return 0;
  }

  async create(dto: CreateTrainingSessionDto) {
    const trainingPlan = await this.trainingPlanRepository.findOne({
      where: {
        id: dto.trainingPlanId,
      },
    });

    if (!trainingPlan) {
      throw new Error('Training plan not found');
    }

    const session = this.trainingSessionRepository.create({
      userId: '91fa8a49-aecf-4f51-800d-dd7d1a65f5a5', // sementara hardcode
      trainingPlanId: dto.trainingPlanId,
      durationMinutes: dto.durationMinutes,
      rating: dto.rating,
      notes: dto.notes,
      xpGained: trainingPlan.xpReward,
    });

    await this.trainingSessionRepository.save(session);

    const user = await this.userRepository.findOne({
      where: {
        id: session.userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    user.xp += trainingPlan.xpReward;
    user.level = this.calculateLevel(user.xp);

    await this.userRepository.save(user);

    return {
      sessionId: session.id,
      xpGained: trainingPlan.xpReward,
      totalXp: user.xp,
      level: user.level,
    };
  }
}