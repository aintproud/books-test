import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UtilsService } from 'src/utils.service';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly utilsService: UtilsService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;
    const userExists = await this.usersRepository.findOne({
      where: [{ email }],
    });
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return await this.usersRepository.save({
      name,
      email,
      password: this.utilsService.createHash(password),
    });
  }
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findOne({
      where: [{ email }],
    });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const passwordHash = this.utilsService.createHash(password);
    if (!(passwordHash === user.password)) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = { id: user.id };
    return await this.jwtService.signAsync(payload, config.jwt);
  }
}
