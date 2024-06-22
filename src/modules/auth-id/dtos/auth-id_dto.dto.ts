import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString} from "class-validator";

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
    @IsString()
    documentType: String;

    @ApiProperty()
    @IsString()
    location: String;

  }