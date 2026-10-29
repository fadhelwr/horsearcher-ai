import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { TrainingSessionsService } from './training-sessions.service.js';
import { CreateTrainingSessionDto } from './dto/create-training-session.dto.js';

@Controller('training-sessions')
export class TrainingSessionsController {
  constructor(
    private readonly trainingSessionsService: TrainingSessionsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Req() req: any,
    @Body() dto: CreateTrainingSessionDto,
  ) {
    return this.trainingSessionsService.create(
      req.user.userId,
      dto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(
    @Req() req: any,
  ) {
    return this.trainingSessionsService.findAll(
      req.user.userId,
    );
  }
}