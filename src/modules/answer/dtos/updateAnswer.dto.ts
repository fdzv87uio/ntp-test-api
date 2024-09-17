import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAnswerDTO {


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskTitle: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    captureDatetime: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    latitude: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    longitude: string;

    @ApiProperty({ required: true, default: 'active' })
    @IsNotEmpty()
    @IsString()
    status: string;

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


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    images?: string[];


    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    annotations?: string[];


}


