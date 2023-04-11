import { JoinRoom } from './../enum/join-room.enum';
import { UserEntity } from './user.entity';
import { RoomEntity } from './room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'JOIN' })
export class JoinEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 8, default: JoinRoom.OFF })
  joinRoom: JoinRoom;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.joins)
  user: UserEntity;

  @Column({ type: 'varchar', length: 16, nullable: false })
  roomId: string;
}
