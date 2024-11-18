import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateElementDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;


    @ApiProperty({ default: 'active' })
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({ default: 'renta' })
    @IsOptional()
    @IsString()
    operation?: string;

    @ApiProperty({ default: 0 })
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({ default: '-0.15899762074480503' })
    @IsOptional()
    @IsString()
    latitude?: string;

    @ApiProperty({ default: '-78.46525402178685' })
    @IsOptional()
    @IsString()
    longitude?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    schedule: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    city?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    country?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    authorName?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    authorNationality: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    authorPhone?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    authorEmail?: string;


    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    plan?: string;

    @ApiProperty({ required: false, default: "none" })
    @IsOptional()
    @IsString()
    deadline?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    images?: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    videos?: string[];

    @ApiProperty({ default: "picosa" })
    @IsOptional()
    @IsString()
    site?: string;

}


