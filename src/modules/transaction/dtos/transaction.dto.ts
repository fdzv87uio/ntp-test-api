import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TransactionDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userEmail: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    transactionType: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    os: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    browser: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    version: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    device: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ip: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    datetime: string

}