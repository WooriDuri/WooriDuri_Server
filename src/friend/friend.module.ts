import { FriendEntity } from './../entity/friend.entity';
import { UserEntity } from './../entity/user.entity';
import { FriendRepository } from './../repository/friend.repository';
import { UserRepository } from './../repository/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FriendEntity]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendService],
})
export class FriendModule {}
