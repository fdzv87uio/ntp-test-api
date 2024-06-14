import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString } from "class-validator";

export class CreateAuthIdToken {
    @ApiProperty()
    @IsString() 
    accessToken: String;

    @ApiProperty()
    @IsDate() 
    accessTokenExpirationDate: Date;

    @ApiProperty()    
    @IsString() 
    expiresIn: String;

    @ApiProperty()
    @IsString() 
    refreshToken: String;

    @ApiProperty()
    @IsString() 
    tokenType: String;

    @ApiProperty()
    @IsString() 
    userExternalId: String;
  }

