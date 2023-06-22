import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  getHello() {
    return this.configService.get('JWT_SECRET');
  }
}
