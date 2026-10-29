import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

@Column({ name: 'password_hash' })
passwordHash: string;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  xp: number;

@CreateDateColumn({ name: 'created_at' })
createdAt: Date;}