import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePreferenceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}