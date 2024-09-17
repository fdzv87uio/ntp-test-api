import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from '../services/upload.service'
import * as multer from 'multer';
import { MulterS3Interceptor } from '../interceptors/upload.interceptor';
import { HasRoles } from 'src/modules/auth/decorators/has-role.decorator';
import { Role } from 'src/modules/auth/models/role.enum';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guard';
import { UploadFileDto } from '../dtos/upload-file.dto';

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
    console.log(body.id);
    const result = await this.uploadService.uploadImage(file, body.id);
    return result;
  }


}
