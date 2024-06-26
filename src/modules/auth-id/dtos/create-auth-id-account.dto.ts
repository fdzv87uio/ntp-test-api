import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAuthIdAccount {
    @ApiProperty()
    @IsString() 
    name: String;

    @ApiProperty()    
    @IsString() 
    lastname: String;

    @ApiProperty()
    @IsString() 
    email: String;

    @ApiProperty()
    @IsString() 
    phone: String;

    @ApiProperty()
    @IsString()
    @IsOptional() 
    accountNumber: String;

    @ApiProperty()
    @IsString() 
    @IsOptional() 
    oneTimeSecret: String;

    @ApiProperty()
    @IsString() 
    @IsOptional() 
    operationId: String;

    @ApiProperty()
    @IsString() 
    @IsOptional() 
    operationURL: String;

    @ApiProperty()
    @IsString() 
    @IsOptional() 
    qrcodeUrl: String;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    transactionType: String;

    @ApiProperty()
    @IsString()
    @IsOptional()
    status: String;

    @ApiProperty()
    @IsNumber()
    @IsOptional() 
    documentType: Number;
  }

  