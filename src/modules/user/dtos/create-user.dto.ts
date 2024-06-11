import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsPhoneNumber, IsNumber, Min, Max } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString() 
    name: String;

    @ApiProperty()
    @IsString() 
    lastname: String;

    @ApiProperty()
    @IsEmail()
    @IsString() 
    email: String;

    @ApiProperty()
    @IsString() 
    password: String;
  }