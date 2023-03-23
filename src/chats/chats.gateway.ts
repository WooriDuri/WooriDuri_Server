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

@WebSocketGateway()
export class ChatsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private logger = new Logger('chat');

  constructor() {
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
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    return 'Hello world!';
  }
}
