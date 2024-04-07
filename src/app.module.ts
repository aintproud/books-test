import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { SeedService } from './seed.service';
import config from './config';
import { Book } from './entities/book.entity';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { UtilsService } from './utils.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.db.url,
      entities: [User, Book],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([User, Book]),
    UsersModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService, UtilsService],
})
export class AppModule {}
