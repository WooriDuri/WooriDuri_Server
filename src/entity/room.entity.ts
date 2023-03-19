import { JoinEntity } from './join.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { join } from 'path';

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

  //   @OneToMany(() => JoinEntity, (join) => join.room)
  //   joins: Promise<JoinEntity[]>;
}
