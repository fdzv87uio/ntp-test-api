import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsMongoId, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePreferenceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly description: string;

  @ApiProperty()
  @IsMongoId()
  readonly category: string;
}