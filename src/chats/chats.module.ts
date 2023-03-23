import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FriendEntity } from 'src/entity/friend.entity';
import { UserEntity } from 'src/entity/user.entity';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserEntity, FriendEntity]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  providers: [ChatsGateway],
  exports: [ChatsGateway],
})
export class ChatsModule {}
