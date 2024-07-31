import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class uploadUrlDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    readonly url: string;
  }