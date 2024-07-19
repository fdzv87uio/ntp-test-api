import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateEventDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    url?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    eventType: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    startDate: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    endDate?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isFrecuency?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    frecuency?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    location?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    city?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    author?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    preferenceListIds: string[]

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    guestList?: string[]

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    uploads?: string[]
}