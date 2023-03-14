import { UserEntity } from 'src/entity/user.entity';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
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
    example: '테스트유저',
    description: 'name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'ASDF231',
    description: 'password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
