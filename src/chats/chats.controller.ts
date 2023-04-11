import { UserEntity } from 'src/entity/user.entity';
import { AuthGuard } from './../auth/jwt/jwt.guard';
import { ChatsService } from './chats.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorator/user.decorator';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findRoom(@CurrentUser() user: UserEntity, @Body() roomId: string) {
    return this.chatsService.findRoom(user, roomId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createRoom(@CurrentUser() user: UserEntity, @Body() userId: number) {
    return this.chatsService.createRoom(user, userId);
  }
}
