import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService} from '../services/upload.service'
import * as multer from 'multer';
import { MulterS3Interceptor } from '../interceptors/upload.interceptor';
import { log } from 'console';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
    private multerS3Uploader: multer.StorageEngine;
    constructor(private readonly uploadService: UploadService) {
        this.multerS3Uploader = this.uploadService.getMulterS3Uploader().storage;
      }

    @Post('load')
    @ApiOperation({ summary: 'Upload a file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'File and eventId',
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
            eventId: {
              type: 'string',
            },
          },
        },
      })
    @UseInterceptors(MulterS3Interceptor)
    async uploadFile(@UploadedFile() file: Express.MulterFile, @Body() body: any) { 
        const { eventId } = body;
        log(eventId)
      const result = await this.uploadService.uploadFile(file.buffer,eventId);
      return result;
    }
}
