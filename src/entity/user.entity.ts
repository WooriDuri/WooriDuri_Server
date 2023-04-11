import { RoomEntity } from './room.entity';
import { JoinEntity } from './join.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FriendEntity } from './friend.entity';

@Entity({ name: 'USER' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  password: string;

  @OneToMany(() => FriendEntity, (friend) => friend.user)
  friends: Promise<FriendEntity[]>;

  @OneToMany(() => JoinEntity, (join) => join.user)
  joins: Promise<JoinEntity[]>;

  @OneToMany(() => JoinEntity, (chat) => chat.user)
  chats: Promise<JoinEntity[]>;

  @OneToMany(() => RoomEntity, (room) => room.user)
  rooms: Promise<RoomEntity[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
