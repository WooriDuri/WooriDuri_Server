import { SearchFriend } from './../dto/search-friend.dto';
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
  UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { CurrentUser } from 'src/decorator/user.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/interceptor/success.interceptor';
import { updateStatus } from 'src/dto/friend-status.dto';
import { ReadSearchFriend } from 'src/dto/read-search-friend.dto';

@Controller('friend')
@UseInterceptors(SuccessInterceptor)
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  //*친구찾기
  @ApiOperation({ summary: '친구찾기' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadSearchFriend,
  })
  @Get('search')
  @UseGuards(AuthGuard())
  findEmail(
    @CurrentUser() user: UserEntity,
    @Body() searchFriend: SearchFriend,
  ): Promise<{ id: number; email: string; name: string; isFriend: boolean }> {
    return this.friendService.findEmail(user, searchFriend);
  }
  //*친구추가
  @ApiOperation({ summary: '친구추가' })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @Post('/:id')
  @UseGuards(AuthGuard())
  createFriend(
    @CurrentUser() user: UserEntity,
    @Param('id') userId: number,
  ): Promise<FriendEntity> {
    return this.friendService.createFriend(user, userId);
  }

  //*친구상태변경
  @ApiOperation({ summary: '친구상태변경' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: updateStatus,
  })
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
  @ApiOperation({ summary: '친구리스트' })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @Get('list')
  @UseGuards(AuthGuard())
  friendList(@CurrentUser() user: UserEntity): Promise<FriendEntity[]> {
    return this.friendService.findList(user);
  }
}
