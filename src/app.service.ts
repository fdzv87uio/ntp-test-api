import { Injectable } from '@nestjs/common';
// comente
@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to SAVY WORKER Backend';
  }
}
