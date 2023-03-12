import { FriendEntity } from './../entity/friend.entity';
import { FindEmail } from './../dto/find-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FriendService } from './friend.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { CurrentUser } from 'src/decorator/user.decorator';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  //*친구찾기
  @Get()
  @UseGuards(AuthGuard())
  findEmail(
    @CurrentUser() user: UserEntity,
    @Body() findEmail: FindEmail,
  ): Promise<UserEntity> {
    return this.friendService.findEmail(user, findEmail);
  }
  //*친구추가
  @Post('/:id')
  @UseGuards(AuthGuard())
  createFriend(
    @CurrentUser() user: UserEntity,
    @Param('id') userId: number,
  ): Promise<FriendEntity> {
    return this.friendService.createFriend(user, userId);
  }

  //*친구상태변경
  @Put('/:id')
  @UseGuards(AuthGuard())
  updateStatus(
    @CurrentUser() user: UserEntity,
    @Param('id') userId: number,
    @Query() status: string,
  ): Promise<FriendEntity> {
    return this.friendService.updateStatus(user, userId, status);
  }

  //*친구리스트
  @Get('list')
  @UseGuards(AuthGuard())
  friendList(@CurrentUser() user: UserEntity): Promise<FriendEntity[]> {
    return this.friendService.findList(user);
  }
}
