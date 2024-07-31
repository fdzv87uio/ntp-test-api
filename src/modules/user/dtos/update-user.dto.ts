import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsArray, IsEmail, IsOptional } from 'class-validator';

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
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({required: false})
  @IsOptional()
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
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  idNumber?: string;

  @ApiProperty()
  @IsArray()
  preferences: string[];

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  user_status?: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  roles?: string[];
}