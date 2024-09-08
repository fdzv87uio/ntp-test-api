import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDTO {

    @ApiProperty()
    title?: string;

    @ApiProperty()
    slug?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    instructions?: string;

    @ApiProperty()
    reward?: number;

    @ApiProperty()
    url?: string;

    @ApiProperty()
    status?: string;

    @ApiProperty()
    startDate?: Date;

    @ApiProperty()
    endDate?: Date;

    @ApiProperty()
    location?: string;

    @ApiProperty()
    address?: string;

    @ApiProperty()
    city?: string;

    @ApiProperty()
    country?: string;

    @ApiProperty()
    author?: string;

    @ApiProperty()
    authorId?: string;

    @ApiProperty()
    images?: string[];

    @ApiProperty()
    videos?: string[];

    @ApiProperty()
    participants?: string[];

    @ApiProperty()
    blacklist?: string[];


}


