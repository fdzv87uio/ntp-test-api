import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRealtorDTO {

    @ApiProperty()
    @IsOptional()
    @IsString()
    userId?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email?: string;


    @ApiProperty()
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    phone?: string;


    @ApiProperty()
    @IsOptional()
    @IsString()
    logo?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    banner?: string;
}


