import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: '테스트유저',
    description: 'name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
