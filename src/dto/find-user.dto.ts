import { IsString, IsEmail } from 'class-validator';
export class FindEmail {
  @IsEmail()
  @IsString()
  email: string;
}
