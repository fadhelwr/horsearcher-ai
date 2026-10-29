import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity.js';
import { TrainingSession } from '../training-sessions/entities/training-session.entity.js';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(TrainingSession)
    private readonly trainingSessionRepository:
      Repository<TrainingSession>,
  ) {}

  async getDashboard(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const completedSessions =
      await this.trainingSessionRepository.count({
        where: {
          userId,
        },
      });

    return {
      name: user.name,
      email: user.email,
      level: user.level,
      xp: user.xp,
      completedSessions,
    };
  }
}