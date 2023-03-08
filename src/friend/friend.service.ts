import { FriendRepository } from './../repository/friend.repository';
import { UserRepository } from './../repository/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(FriendRepository)
    private readonly friendRepository: FriendRepository,
  ) {}
  //*친구추가

  //*친구상태변경
}
