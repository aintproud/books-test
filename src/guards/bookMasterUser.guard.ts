import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import config from '../config';
import { Book } from 'src/entities/book.entity';
const jwtConfig = config.jwt;

@Injectable()
export class BookMasterUserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const askedId = +req.params.id;
    if (isNaN(askedId)) {
      throw new BadRequestException('Invalid book id');
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }
    const jwt = authHeader.substring(7);
    let payload;
    try {
      payload = this.jwtService.verify(jwt, { secret: jwtConfig.secret });
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException('JWT has expired');
      }
      throw new UnauthorizedException('Invalid JWT');
    }
    const userId = payload.id;
    const book = await this.bookRepository.findOne({
      where: { id: askedId },
      relations: ['user'],
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book.user.id === userId;
  }
}
