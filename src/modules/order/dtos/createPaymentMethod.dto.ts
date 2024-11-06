import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class OrderDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    item: string


    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    paymentMethodId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string


}