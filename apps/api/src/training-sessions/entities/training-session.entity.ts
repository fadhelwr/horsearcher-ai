import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('training_sessions')
export class TrainingSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'training_plan_id' })
  trainingPlanId: string;

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