import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CategoryDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    description: string;

}