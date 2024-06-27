import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString} from "class-validator";

export class AuthIdCheckOperationDto {
    @ApiProperty()    
    @IsString() 
    operationId: String;  
}