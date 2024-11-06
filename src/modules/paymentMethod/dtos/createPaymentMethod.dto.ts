import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class PaymentMethodDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userEmail: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    hash: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    status: string
}