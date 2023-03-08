import { FriendService } from './friend.service';
import { Controller } from '@nestjs/common';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  //*친구추가

  //*친구상태변경
}
