import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadVideoFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Video File',
  })
  file: any;

  @ApiProperty({
    type: 'string',
    description: 'Event ID',
  })
  @IsString()
  eventId: string;
}