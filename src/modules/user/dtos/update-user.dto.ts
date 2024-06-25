import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsPhoneNumber, IsNumber, Min, Max, IsEnum, IsDate } from 'class-validator';
import { DocumentTypeEnum } from '../enums/document-type.enum';

export class CreateUserDto {
    @ApiProperty()
    @IsString() 
    name?: String;

    @ApiProperty()
    @IsString() 
    lastname?: String;

    @ApiProperty()
    @IsString() 
    password?: String;

    @ApiProperty()
    @IsString() 
    address?: String;

    @ApiProperty()
    @IsDate()
    birthDate?: Date;
    
    @ApiProperty()
    @IsEnum(DocumentTypeEnum)
    documentType?: DocumentTypeEnum;

    @ApiProperty()
    @IsString()
    user_status?: String;

    @ApiProperty()
    @IsString()
    roles?: String;
  }