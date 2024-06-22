import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, IsString, MinLength }  from 'class-validator'

export class LoginDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string
}