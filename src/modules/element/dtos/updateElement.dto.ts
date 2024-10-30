import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateElementDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    slug?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;


    @ApiProperty({ default: 'active' })
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({ default: 'mujeres' })
    @IsNotEmpty()
    @IsString()
    category: string;

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

}


