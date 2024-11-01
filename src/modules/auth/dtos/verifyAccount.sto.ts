import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class VerifyAccountDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    token: string
}