import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsString() 
    name?: String;

  @ApiProperty()
  @IsString()
  lastname?: string;

  @ApiProperty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsDate()
  birthDate?: Date;

  @ApiProperty()
  @IsString()
  preferences: string;

  @ApiProperty()
  @IsString()
  user_status?: string;

  @ApiProperty()
  @IsString()
  roles?: string;
}