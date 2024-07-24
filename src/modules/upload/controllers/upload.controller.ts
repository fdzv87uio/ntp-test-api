import { Body, Controller, Delete, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService} from '../services/upload.service'
import * as multer from 'multer';
import { MulterS3Interceptor } from '../interceptors/upload.interceptor';
import { log } from 'console';
import { HasRoles } from 'src/modules/auth/decorators/has-role.decorator';
import { Role } from 'src/modules/auth/models/role.enum';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guard';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
    private multerS3Uploader: multer.StorageEngine;
    constructor(private readonly uploadService: UploadService) {
        this.multerS3Uploader = this.uploadService.getMulterS3Uploader().storage;
      }
    
    @HasRoles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Upload a file' })
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Image File',
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
            eventId:{
              type: 'string'
            }            
          },
        },
      })
    @UseInterceptors(MulterS3Interceptor)
    async uploadFile(@UploadedFile() file: Express.MulterFile,@Body() body: any) {
      console.log(body.eventId);
      const result = await this.uploadService.uploadFile(file,body.eventId);
      return result;
    }

    @HasRoles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'delete upload' })
    @Delete('file/:url')    
    async deleteUpload(@Param('url') url: string) {      
      const result = await this.uploadService.deleteUpload(url);
      return result;
    }


}