import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class CompleteEmailDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    subject: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message: string
}