import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateElementDTO {


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
    @IsArray()
    images?: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    videos?: string[];

}


