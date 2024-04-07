import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @Length(6)
  password: string;
}
