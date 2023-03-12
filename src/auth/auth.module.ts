import { ConfigModule } from '@nestjs/config';
import { UserModule } from './../user/user.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { FriendRepository } from 'src/repository/friend.repository';
import { UserRepository } from 'src/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { FriendEntity } from 'src/entity/friend.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FriendEntity]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
