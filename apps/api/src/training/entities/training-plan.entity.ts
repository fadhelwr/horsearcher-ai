import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('training_plans')
export class TrainingPlan {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'duration_minutes' })
  durationMinutes: number;

  @Column({ name: 'target_level' })
  targetLevel: number;

  @Column({ name: 'xp_reward' })
  xpReward: number;
}