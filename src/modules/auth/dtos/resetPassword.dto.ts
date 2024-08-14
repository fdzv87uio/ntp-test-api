import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, IsString } from 'class-validator'

export class ResetPasswordDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    token: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    confirmPassword: string
}