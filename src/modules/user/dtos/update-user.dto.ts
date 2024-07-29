import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsArray, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  lastname?: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password?: string;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsString()
  addressDetails?: string;

  @ApiProperty()
  @IsString()
  postalCode: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate({ message: 'birthDate must be a valid date' })
  birthDate?: Date;

  @ApiProperty()
  @IsString()
  idNumber: string;

  @ApiProperty()
  @IsArray()
  preferences: string[];

  @ApiProperty()
  @IsString()
  user_status?: string;

  @ApiProperty()
  @IsString()
  roles?: string[];
}