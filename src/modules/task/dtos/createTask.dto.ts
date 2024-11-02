import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    instructions: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    reward?: number;

    @ApiProperty({ required: true, default: 'active' })
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    endDate?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    author?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    authorId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    images?: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    videos?: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    participants?: string[];

    @ApiProperty({ required: true, default: 'Ecuid' })
    @IsNotEmpty()
    @IsString()
    project: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    blacklist?: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    classes?: string[];

}


