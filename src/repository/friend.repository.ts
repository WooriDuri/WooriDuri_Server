import { EntityRepository, Repository } from 'typeorm';
import { FriendEntity } from './../entity/friend.entity';

@EntityRepository(FriendEntity)
export class FriendRepository extends Repository<FriendEntity> {}
