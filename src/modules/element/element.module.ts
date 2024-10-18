import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from '../upload/upload.module';
import { ElementSchema } from './schemas/element.schema';
import { UserSchema } from '../user/schemas/user.schema';
import { UserService } from '../user/services/user.service';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Element', schema: ElementSchema }, { name: 'User', schema: UserSchema }]),
    UploadModule],
  controllers: [ElementController],
  providers: [ElementService, UserService]
})
export class ElementModule {} 
