import { IsString, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image File',
  })  
  file: any;

  @ApiProperty({
    type: 'string',
    description: 'Event ID',
  })  
  @IsString()
  eventId: string;
}