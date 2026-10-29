import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AppController } from './app.controller.js';
import { SkillsModule } from './skills/skills.module.js';
import { TrainingModule } from './training/training.module.js';
import { TrainingSessionsModule } from './training-sessions/training-sessions.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,

      autoLoadEntities: true,
      synchronize: false,
    }),

    UsersModule,

    AuthModule,

    SkillsModule,

    TrainingModule,

    TrainingSessionsModule,
  ],

  controllers: [AppController],
})
export class AppModule {}