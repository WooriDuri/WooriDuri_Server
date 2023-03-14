import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserDto } from './read-user.dto';

export class ReadSearchFriend extends OmitType(UserDto, [] as const) {
  @ApiProperty({
    example: 'true | false',
    description: 'isFriend',
  })
  isFriend: boolean;
}
