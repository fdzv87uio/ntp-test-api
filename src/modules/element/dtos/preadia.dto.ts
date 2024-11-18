import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PraediaDTO {

    @ApiProperty({ default: 'casa' })
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({ default: 'venta' })
    @IsNotEmpty()
    @IsString()
    operation: string;

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


