import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from '../upload/upload.module';
import { TaskSchema } from './schemas/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    UploadModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {} 
