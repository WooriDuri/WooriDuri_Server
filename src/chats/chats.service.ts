import { JoinEntity } from './../entity/join.entity';
import { UserService } from './../user/user.service';
import { UserEntity } from 'src/entity/user.entity';
import { RoomEntity } from './../entity/room.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from 'src/entity/chat.entity';
import { customAlphabet } from 'nanoid';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
    private readonly userService: UserService,
    @InjectRepository(JoinEntity)
    private readonly joinRepository: Repository<JoinEntity>,
  ) {}

  async findRoom(user: UserEntity, roomId: string) {
    try {
      const exist = await this.roomRepository.findOne({
        where: { roomId: roomId },
      });
      if (exist) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async createRoom(user: UserEntity, userId: number) {
    try {
      const exist = await this.userService.existUser(userId);
      if (exist !== true) {
        throw new HttpException('알 수 없는 요청입니다.', 400);
      }
      const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVW23456789', 12);
      const roomId = `${user.id}+${nanoid}`;
      const existRoom = await this.roomRepository.findOne({
        where: { roomId: roomId },
      });
      if (existRoom) {
        return existRoom.roomId;
      }
      const room = this.roomRepository.create();
      room.roomId = roomId;
      room.userId = user.id;
      room.member = userId;
      await this.roomRepository.save(room);
      return room.roomId;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async joinUesr(userId: number, roomId: string) {
    try {
      const room = await this.roomRepository.findOne({
        where: { roomId: roomId },
      });
      if (room.userId !== userId && room.member !== userId) {
        throw new HttpException('room에 속한 유저가 아닙니다.', 400);
      }
      const exist = await this.joinRepository.findOne({
        where: { roomId: roomId, userId: userId },
      });
      if (exist) {
        throw new HttpException('잘못된 요청입니다.', 400);
      }
      const join = this.joinRepository.create();
      join.roomId = roomId;
      join.userId = userId;
      return await this.joinRepository.save(join);
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async leaveUser(userId: number, roomId: string) {
    try {
      const exist = await this.joinRepository.findOne({
        where: { roomId: roomId, userId: userId },
      });
      if (!exist) {
        throw new HttpException('알 수 없는 요청입니다.', 400);
      }
      return await this.joinRepository.delete(exist);
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async createChat(user: UserEntity, roomId: string, message: string) {
    try {
      const chat = this.chatRepository.create();
      chat.chat = message;
      chat.roomId = roomId;
      chat.userId = user.id;
      await this.chatRepository.save(chat);
      const result = {
        createdAt: chat.createdAt,
        message: chat.chat,
        userId: chat.userId,
      };
      return result;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  async unRead(user: UserEntity, roomId: string, message: string) {
    try {
      const room = await this.roomRepository.findOne({
        where: { roomId: roomId },
      });
      let userId;
      if (user.id === room.userId) {
        userId = room.member;
      } else {
        userId = room.userId;
      }
      const joinRoom = await this.joinRepository.findOne({
        where: { roomId: roomId, userId: userId },
      });
      if (joinRoom) {
        return true;
      } else {
        return userId;
      }
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }
}
