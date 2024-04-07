import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, userId: string) {
    return await this.bookRepository.save({
      ...createBookDto,
      user: { id: userId },
    });
  }

  async findAll(
    page: number,
    limit: number,
    author: string,
    release_year: number,
  ) {
    return await this.bookRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        author,
        release_year,
      },
    });
  }

  async findOne(id: number) {
    return await this.bookRepository.findOneBy({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.update(id, updateBookDto);
  }

  async remove(id: number) {
    return await this.bookRepository.delete(id);
  }
}
