import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from '../upload/upload.module';
import { TaskSchema } from './schemas/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserSchema } from '../user/schemas/user.schema';
import { UserService } from '../user/services/user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }, { name: 'User', schema: UserSchema }]),
    UploadModule],
  controllers: [TaskController],
  providers: [TaskService, UserService]
})
export class TaskModule {} 
