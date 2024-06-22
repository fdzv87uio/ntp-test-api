import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString} from "class-validator";

export class AuthIdCompleteEnrollDto {
    @ApiProperty()
    @IsEmail()
    @IsString() 
    email: String;  
}