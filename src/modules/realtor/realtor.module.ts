import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from '../upload/upload.module';
import { RealtorSchema } from './schemas/realtor.schema';
import { RealtorController } from './realtor.controller';
import { RealtorService } from './realtor.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Realtor', schema: RealtorSchema }]),
    UploadModule],
  controllers: [RealtorController],
  providers: [RealtorService]
})
export class RealtorModule {} 
