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
  @IsString()
  addressDetails: string;

  @ApiProperty()
  @IsString()
  postalCode: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: 'birthDate must be a valid date' })
  birthDate: Date;

  @ApiProperty({required: false})
  @IsString()
  idNumber?: string;

  @ApiProperty()
  @IsArray()
  preferences: string[];

}