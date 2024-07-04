import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreateEventDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    eventType: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    date: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    author: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    categoryList: string[]

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    guestList: string[]

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    uploads: string[]
}