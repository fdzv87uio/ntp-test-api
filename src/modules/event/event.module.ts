import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { UploadModule } from '../upload/upload.module';
import { EventResolverService } from './resolverservice/event.resolverservice';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    UploadModule],
  controllers: [EventController],
  providers: [EventService, EventResolverService]
})
export class EventModule {} 
