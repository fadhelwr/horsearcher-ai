import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      app: 'HorseArcher API',
      version: '1.0.0',
      status: 'running',
    };
  }
}