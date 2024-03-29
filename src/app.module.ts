import { JoinEntity } from './entity/join.entity';
import { ChatEntity } from './entity/chat.entity';
import { RoomEntity } from './entity/room.entity';
import { FriendEntity } from './entity/friend.entity';
import { UserEntity } from './entity/user.entity';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UserModule } from './user/user.module';
import { FriendModule } from './friend/friend.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// import { ChatsGateway } from './chats/chats.gateway';
// import { ChatsModule } from './chats/chats.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, FriendEntity, RoomEntity, ChatEntity, JoinEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      FriendEntity,
      RoomEntity,
      ChatEntity,
    ]),
    UserModule,
    FriendModule,
    AuthModule,
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
