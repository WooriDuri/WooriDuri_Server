import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'testUser@naver.com',
    description: 'email',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
  @ApiProperty({
    example: 'ASDF231',
    description: 'password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
