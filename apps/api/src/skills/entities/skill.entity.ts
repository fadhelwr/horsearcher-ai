import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'required_level' })
  requiredLevel: number;

  @Column({ name: 'xp_reward' })
  xpReward: number;

  @Column({ name: 'sort_order' })
  sortOrder: number;
}