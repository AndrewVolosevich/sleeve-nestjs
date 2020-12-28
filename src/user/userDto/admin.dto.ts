import { IsEmail, MinLength } from 'class-validator';

export class AdminDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @MinLength(6)
  secret: string;
}
