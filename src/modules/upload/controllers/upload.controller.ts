import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService} from '../services/upload.service'
import * as multer from 'multer';
import { MulterS3Interceptor } from '../interceptors/upload.interceptor';
import { log } from 'console';
import { HasRoles } from 'src/modules/auth/decorators/has-role.decorator';
import { Role } from 'src/modules/auth/models/role.enum';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guard';
import { UploadFileDto } from '../dtos/upload-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadVideoFileDto } from '../dtos/Upload-video.dto';
import { uploadUrlDto } from '../dtos/upload-url.dto';

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
    @ApiOperation({ summary: 'Upload an image file' })
    @Post('/image')
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UploadFileDto })
    @UseInterceptors(MulterS3Interceptor)
    async uploadFile(
      @UploadedFile() file: Express.MulterFile,
      @Body(new ValidationPipe()) body: UploadFileDto
    ) {
      console.log(body.eventId);
      const result = await this.uploadService.uploadFile(file, body.eventId);
      return result;
    }

    @HasRoles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Upload a video file' })
    @Post('/video')
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UploadVideoFileDto })
    @UseInterceptors(MulterS3Interceptor)
    async uploadVideoFile(@UploadedFile() file: Express.MulterFile,@Body() body: any) {       
      const result = await this.uploadService.uploadVideoFile(file,body.eventId);
      return result;
    }

    // @HasRoles(Role.Admin, Role.User)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    @ApiOperation({ summary: 'Post url signed' })
    @Post('/url')
    async signedUrl(@Body() body: uploadUrlDto): Promise<any> {
      const data =  await this.uploadService.createPresignedUrl(body.url);
      return{
        success: true,
        signedUrl: data,
      }
    }



    // @HasRoles(Role.Admin, Role.User)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @ApiBearerAuth()
    // @ApiOperation({ summary: 'delete upload' })
    // @Delete('file/:url')    
    // async deleteUpload(@Param('url') url: string) {      
    //   const result = await this.uploadService.deleteUpload(url);
    //   return result;
    // }


}
