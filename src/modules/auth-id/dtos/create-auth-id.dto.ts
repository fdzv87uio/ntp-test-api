import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString} from "class-validator";

export class CreateAuthIdAccountDto {
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