import { Injectable } from '@nestjs/common';
// comentario
@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to NEST.js Test';
  }
}
