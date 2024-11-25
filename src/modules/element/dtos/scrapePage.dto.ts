import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ScrapePageDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    page: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    country?: string;

}


