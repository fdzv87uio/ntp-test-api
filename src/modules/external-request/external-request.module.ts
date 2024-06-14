import { Module } from '@nestjs/common';
import { ExternalRequestService } from './services/external-request.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  providers: [ExternalRequestService],
  exports: [ExternalRequestService],
  controllers: [],  
})
export class ExternalRequestModule {}
