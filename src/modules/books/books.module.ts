import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User])],
  controllers: [BooksController],
  providers: [BooksService, JwtService],
})
export class BooksModule {}
