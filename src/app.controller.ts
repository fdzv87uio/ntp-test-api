import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './modules/auth/guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getCreds')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getCredentials(): any {
    const creds = {
      AES_KEY: process.env.AES_KEY,
      AES_IV: process.env.AES_IV,
      AES_METHOD: process.env.AES_METHOD,
    }
    return creds;
  }
}
