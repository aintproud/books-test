import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { BookMasterUserGuard } from 'src/guards/bookMasterUser.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async create(@Body() createBookDto: CreateBookDto, @Req() req) {
    return await this.booksService.create(createBookDto, req.userId);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('author') author: string,
    @Query('release_year') release_year: number,
  ) {
    const books = await this.booksService.findAll(
      page,
      limit,
      author,
      release_year,
    );
    return {
      data: books,
      total: books.length,
      page: +page,
      limit: +limit,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.booksService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(BookMasterUserGuard)
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateBookDto: UpdateBookDto,
  ) {
    await this.booksService.update(id, updateBookDto);
    return 'Book updated successfully';
  }

  @Delete(':id')
  @UseGuards(BookMasterUserGuard)
  async remove(@Param('id') id: number) {
    await this.booksService.remove(id);
    return 'Book deleted successfully';
  }
}
