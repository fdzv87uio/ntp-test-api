import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  url?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventType: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  preferenceListIds: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  guestList?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  uploads?: string[];
}
