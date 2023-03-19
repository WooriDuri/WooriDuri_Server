import { JoinEntity } from './join.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FriendEntity } from './friend.entity';

@Entity({ name: 'user' })
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
}
