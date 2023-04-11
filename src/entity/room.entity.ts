import { JoinEntity } from './join.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { join } from 'path';
import { UserEntity } from './user.entity';

@Entity({ name: 'ROOM' })
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: false,
  })
  roomId: string;

  @Column({ type: 'int', nullable: false })
  member: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.rooms)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @OneToMany(() => JoinEntity, (join) => join.room)
  //   joins: Promise<JoinEntity[]>;
}
