import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'CHAT' })
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256, nullable: false })
  chat: string;

  @Column({
    type: 'varchar',
    length: 16,
    nullable: false,
  })
  roomId: string;
}
