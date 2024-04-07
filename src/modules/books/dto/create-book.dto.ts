import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsString()
  author: string;

  @IsNumber()
  release_year: number;

  @IsString()
  description: string;
}
