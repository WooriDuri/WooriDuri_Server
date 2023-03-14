import { StatusEnum } from './../enum/friend-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class updateStatus {
  @ApiProperty({
    example: 'BLOCK || DELETE',
    description: 'status',
    required: true,
  })
  status: StatusEnum.BLOCK | StatusEnum.DELETE;
}
