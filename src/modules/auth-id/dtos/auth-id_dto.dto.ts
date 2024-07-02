import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsNumber} from "class-validator";
import { DocumentTypeEnum } from "../enums/document-types.enum";

export class AuthIdAccountDto {
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
    @IsOptional()
    @IsPhoneNumber()
    @IsString() 
    phone: String;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    documentType: DocumentTypeEnum;
  }