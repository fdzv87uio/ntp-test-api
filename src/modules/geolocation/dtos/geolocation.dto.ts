import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class GeolocationDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    query: string

}