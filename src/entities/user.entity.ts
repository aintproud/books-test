import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Book, (book) => book.user, { onDelete: 'CASCADE' })
  book: Book[];
}
