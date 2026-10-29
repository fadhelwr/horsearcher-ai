import { Controller, Get } from '@nestjs/common';
import { SkillsService } from './skills.service.js';

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService,
  ) {}

  @Get()
  async findAll() {
    return this.skillsService.findAll();
  }
}