import { SearchFriend } from './../dto/search-friend.dto';
import { Do } from './../exception/do';
import { FindEmail } from './../dto/find-user.dto';
import { FriendEntity } from './../entity/friend.entity';
import { UserEntity } from './../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusEnum } from 'src/enum/friend-status.enum';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FriendEntity)
    private readonly friendRepository: Repository<FriendEntity>,
  ) {}
  //*친구찾기
  async findEmail(user: UserEntity, searchFriend: SearchFriend) {
    const findUser = await this.userRepository.findOne({
      email: searchFriend.email,
    });
    Do.require(!!findUser, '없는 유저입니다.');
    const existFriend = await this.friendRepository.findOne({
      hostId: user.id,
      userId: findUser.id,
    });
    if (existFriend) {
      return {
        id: findUser.id,
        email: findUser.email,
        name: findUser.name,
        isFriend: true,
      };
    } else {
      return {
        id: findUser.id,
        email: findUser.email,
        name: findUser.name,
        isFriend: false,
      };
    }
  }
  //*친구추가
  async createFriend(user: UserEntity, userId: number): Promise<FriendEntity> {
    const friend = this.friendRepository.create();
    friend.hostId = user.id;
    friend.status = StatusEnum.ACTIVE;
    friend.userId = userId;
    return await this.friendRepository.save(friend);
  }

  //*친구상태변경
  async updateStatus(
    user: UserEntity,
    userId: number,
    status: string,
  ): Promise<FriendEntity> {
    const friend = await this.friendRepository.findOne({
      where: { hostId: user.id, userId: userId },
    });
    Do.require(!!friend, '잘못된 요청입니다.');
    if (status === StatusEnum.BLOCK) {
      friend.status = StatusEnum.BLOCK;
    } else if (status === StatusEnum.DELETE) {
      friend.status = StatusEnum.DELETE;
    }
    return await this.friendRepository.save(friend);
  }

  //*친구리스트
  async findList(user: UserEntity): Promise<FriendEntity[]> {
    const findList = await this.friendRepository.find({ hostId: user.id });
    return findList;
  }
}
