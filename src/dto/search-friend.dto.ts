import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create-user.dto';

export class SearchFriend extends PickType(CreateUserDto, ['email'] as const) {}
