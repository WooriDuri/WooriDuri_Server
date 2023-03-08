import { UserService } from './user.service';
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //*회원가입

  //*로그인

  //*프로필조회

  //*프로필수정
}
