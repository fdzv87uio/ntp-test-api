import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryDTO {

    @ApiProperty({ default: 'mujeres' })
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({ default: 'Quito' })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiProperty({ default: 'Ecuador' })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    query?: string;


}


