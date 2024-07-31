import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsMongoId, IsNotEmpty } from 'class-validator';
export class UpdatePreferenceDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly name?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description?: string;

    @IsMongoId()
    readonly category?: string;
}