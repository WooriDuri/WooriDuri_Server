import { UserEntity } from 'src/entity/user.entity';
import { JoinEntity } from './../entity/join.entity';
import { ChatsService } from './chats.service';
import { ChatEntity } from './../entity/chat.entity';
import { Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrentUser } from 'src/decorator/user.decorator';

@WebSocketGateway()
export class ChatsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private logger = new Logger('chat');

  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
    private readonly chatsService: ChatsService,
    @InjectRepository(JoinEntity)
    private readonly joinRepository: Repository<JoinEntity>,
  ) {
    this.logger.log('constructor');
  }
  afterInit() {
    this.logger.log('init');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconneted: ${socket.id} ${socket.nsp.name}`);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected: ${socket.id} ${socket.nsp.name}`);
  }

  @UseGuards(AuthGuard())
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @CurrentUser() user: UserEntity,
    @MessageBody() data: { roomId: string; userId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomId, userId } = data;
    socket.join(roomId);
    const join = await this.chatsService.joinUesr(userId, roomId);
    this.logger.log(`User ${userId} joined room ${roomId}`);
    return join;
  }

  @UseGuards(AuthGuard())
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @CurrentUser() user: UserEntity,
    @MessageBody() data: { roomId: string; userId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomId, userId } = data;
    socket.leave(roomId);
    const leave = await this.chatsService.leaveUser(userId, roomId);
    this.logger.log(`User ${userId} leaved room ${roomId}`);
    return leave;
  }

  @UseGuards(AuthGuard())
  @SubscribeMessage('message')
  async handleMessage(
    @CurrentUser() user: UserEntity,
    @MessageBody() data: { roomId: string; message: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomId, message } = data;
    const chat = await this.chatsService.createChat(user, roomId, message);
    socket.broadcast.to(roomId).emit('message', chat);
    const unRead = await this.chatsService.unRead(user, roomId, message);
    socket.broadcast.to(roomId).emit('unread', unRead);
    return chat;
  }
}
