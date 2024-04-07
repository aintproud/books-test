import { IsNumber, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  release_year: number;

  @IsString()
  description: string;
}
