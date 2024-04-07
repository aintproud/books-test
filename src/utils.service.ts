import { Injectable } from '@nestjs/common';
import { scryptSync } from 'crypto';
import config from './config';
const {
  scrypt: { salt, len },
} = config;
@Injectable()
export class UtilsService {
  createHash(password: string) {
    return scryptSync(password, salt, len).toString('hex');
  }
}
