import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ScrapePageDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    page: string;

}


