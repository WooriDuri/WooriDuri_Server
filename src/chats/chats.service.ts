import { UserService } from './../user/user.service';
import { UserEntity } from 'src/entity/user.entity';
import { RoomEntity } from './../entity/room.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from 'src/entity/chat.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
    private readonly userService: UserService,
  ) {}

  async createRoom(user: UserEntity, userId: number) {
    const exist = await this.userService.existUser(userId);
    if (exist !== true) {
      throw new HttpException('알 수 없는 요청입니다.', 400);
    }
    //*room이 존재하는지 체크해야함
    const checkMin = Math.min(user.id, userId);
    const checkMax = Math.max(user.id, userId);
    const sumNum = checkMax + checkMin;
    const existRoom = await this.roomRepository.findOne({
      where: { roomId: sumNum.toString() },
    });
    if (existRoom) {
      return true;
    }
    const room = await this.roomRepository.create();
    room.roomId = sumNum.toString();
    return await this.roomRepository.save(room);
  }
}
