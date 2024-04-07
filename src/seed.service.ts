import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { faker } from '@faker-js/faker';
import { UtilsService } from './utils.service';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private readonly utilsService: UtilsService,
  ) {}
  public async seed() {
    await this.userRepository.delete({});
    await this.bookRepository.delete({});

    const user = await this.userRepository.save({
      name: 'name',
      email: 'email@gmail.com',
      password: this.utilsService.createHash('password'),
    });
    const books = Array.from({ length: 10 }).map(() => {
      const book = new Book();
      book.title = faker.commerce.productName();
      book.author = faker.person.fullName();
      book.release_year = faker.number.int({ min: 1900, max: 2022 });
      book.description = faker.lorem.paragraph();
      book.user = user;
      return book;
    });
    await this.bookRepository.save(books);
  }
}
