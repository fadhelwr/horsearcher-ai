import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { TrainingPlan } from '../../training/entities/training-plan.entity.js';

@Entity('training_sessions')
export class TrainingSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'training_plan_id' })
  trainingPlanId: string;

  @ManyToOne(() => TrainingPlan)
  @JoinColumn({ name: 'training_plan_id' })
  trainingPlan: TrainingPlan;

  @CreateDateColumn({
  name: 'created_at',
})
createdAt: Date;

  @Column({ name: 'duration_minutes' })
  durationMinutes: number;

  @Column()
  rating: number;

  @Column()
  notes: string;

  @Column({
    name: 'xp_gained',
    default: 0,
  })
  xpGained: number;
}