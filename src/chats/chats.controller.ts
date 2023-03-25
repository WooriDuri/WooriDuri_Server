import { UserEntity } from 'src/entity/user.entity';
import { AuthGuard } from './../auth/jwt/jwt.guard';
import { ChatsService } from './chats.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorator/user.decorator';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createRoom(@CurrentUser() user: UserEntity, @Body() userId: number) {
    return this.chatsService.createRoom(user, userId);
  }
}
