import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from '../upload/upload.module';
import { AnswerSchema } from './schemas/answer.schema';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Answer', schema: AnswerSchema }]),
    UploadModule],
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {} 
