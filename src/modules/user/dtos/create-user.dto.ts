import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  site?: string;

}