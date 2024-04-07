import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  password: string;
}
