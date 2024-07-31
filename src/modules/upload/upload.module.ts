import { Module } from '@nestjs/common';
import { UploadService } from './services/upload.service';
import { UploadController } from './controllers/upload.controller';

@Module({
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService]
})
export class UploadModule {}
