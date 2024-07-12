import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEmail, IsDate, IsNotEmpty, IsArray } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: 'birthDate must be a valid date' })
  birthDate: Date;

  @ApiProperty()
  @IsArray()
  preferences: string[];

}