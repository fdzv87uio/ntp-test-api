import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePreferenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}