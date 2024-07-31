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

  @ApiProperty({required: false})
  @IsString()
  password?: string;

  @ApiProperty({required: false})
  @IsString()
  address?: string;

  @ApiProperty({required: false})
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

  @ApiProperty({required: false})
  @IsString()
  idNumber?: string;

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