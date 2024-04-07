import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
const jwtConfig = config.jwt;
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
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
    req.userId = userId;
    const user = await this.usersRepository.findOneBy({ id: userId });
    return !!user;
  }
}
