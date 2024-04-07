import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  release_year: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.book, {
    onDelete: 'CASCADE',
  })
  user: User;
}
