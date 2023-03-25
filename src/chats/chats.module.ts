import { JoinEntity } from './../entity/join.entity';
import { UserModule } from './../user/user.module';
import { ChatEntity } from './../entity/chat.entity';
import { RoomEntity } from './../entity/room.entity';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FriendEntity } from 'src/entity/friend.entity';
import { UserEntity } from 'src/entity/user.entity';
import { ChatsGateway } from './chats.gateway';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([
      UserEntity,
      FriendEntity,
      RoomEntity,
      ChatEntity,
      JoinEntity,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  providers: [ChatsGateway, ChatsService],
  exports: [ChatsGateway],
  controllers: [ChatsController],
})
export class ChatsModule {}
