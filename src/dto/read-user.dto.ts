import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends OmitType(CreateUserDto, ['password'] as const) {
  @ApiProperty({
    example: '1234',
    description: 'id',
  })
  id: number;
  //   @ApiProperty({
  //     example: 'testUser@naver.com',
  //     description: 'email',
  //     required: true,
  //   })
  //   email: string;

  //   @ApiProperty({
  //     example: '테스트유저',
  //     description: 'name',
  //     required: true,
  //   })
  //   name: string;
}
