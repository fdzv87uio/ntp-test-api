import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsArray, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({required: false})
  @IsOptional()
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
  @IsOptional()
  @IsString()
  addressDetails?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({required: false})
  @Type(() => Date)
  @IsDate({ message: 'birthDate must be a valid date' })
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  idNumber?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsArray()
  preferences?: string[];

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  user_status?: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  roles?: string[];
}