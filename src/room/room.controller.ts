import { RoomService } from './room.service';
import { Controller, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/interceptor/success.interceptor';

@Controller('room')
@UseInterceptors(SuccessInterceptor)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
}
