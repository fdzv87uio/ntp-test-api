import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsEmail, IsOptional, IsArray, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ required: false })
  @Type(() => Date)
  @IsDate({ message: 'birthDate must be a valid date' })
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  idNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  idType?: string;


  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  user_status?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  roles?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  plan?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  tasks?: any[];

  @ApiProperty({ required: false })
  @IsOptional()
  answers?: any[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  account_balance?: number[];

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  quota?: number;

  @ApiProperty({ required: false, default: "none" })
  @IsString()
  @IsOptional()
  deadline?: string;

  @ApiProperty({ default: "picosa" })
  @IsString()
  @IsOptional()
  site?: string;


}