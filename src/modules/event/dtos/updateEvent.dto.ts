import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateEventDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    url?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn(['in-person', 'online'])
    eventType: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    startTime: string;

    @ApiProperty({ required: false, default: true })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value !== undefined ? value : true)
    eventEnds?: boolean = true;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    endDate?: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    endTime?: string;

    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => value !== undefined ? value : 1)
    occurrenceCount?: number;

    @ApiProperty({ required: false, default: false })
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value !== undefined ? value : false)
    isFrecuency?: boolean = false;

    @ApiProperty({ required: false, default: 'None' })
    @IsOptional()
    @IsString()
    @IsIn(["None", "Daily", "Weekly", "Monthly", "Anually"])
    frecuency?: string;

    @ApiProperty({ required: false, default: 'None' })
    @IsOptional()
    @IsString()
    @IsIn(["None", "Pending", "Executed"])
    frecuencyStatus?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    location?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    city?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    author?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    preferenceListIds: string[]

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    guestList?: string[]

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    images?: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    videos?: string[];
}