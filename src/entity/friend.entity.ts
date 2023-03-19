import { StatusEnum } from 'src/enum/friend-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'friend' })
export class FriendEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  hostId: number;

  @Column({
    type: 'varchar',
    length: 32,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.friends)
  user: UserEntity;
}
