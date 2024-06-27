import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEmail, IsOptional, IsPhoneNumber, IsNumber, Min, Max, IsEnum, IsDate, IsNotEmpty } from 'class-validator';
import { DocumentTypeEnum } from '../enums/document-type.enum';

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

    @ApiProperty()
    @IsString() 
    address: String;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate({ message: 'birthDate must be a valid date' })
    birthDate: Date;    
    
  }