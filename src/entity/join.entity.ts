import { UserEntity } from './user.entity';
import { RoomEntity } from './room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'JOIN' })
export class JoinEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.joins)
  user: UserEntity;

  @Column({ type: 'varchar', length: 16, nullable: false })
  roomId: string;

  //   @ManyToOne(() => RoomEntity, (room) => room.joins)
  //   room: RoomEntity;
}
