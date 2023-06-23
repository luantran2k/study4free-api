import {
  ConflictException,
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private confictService: ConfigService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByUserName(username);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ username, password }: LoginDto) {
    const userValid = await this.validateUser(username, password);
    if (!userValid) {
      throw new UnauthorizedException('Usernam or password is incorrect');
    }
    const { refreshToken, ...userInfo } = userValid;
    const tokens = await this.getTokens(userInfo.id, userInfo.username);
    await this.updateRefreshToken(userInfo.id, tokens.refreshToken);
    return {
      ...userInfo,
      tokens,
    };
  }

  async register(user: CreateUserDto) {
    const validateResult = await this.usersService.isValidUser(user);
    if (!validateResult.isValid) {
      throw new ConflictException(validateResult.message);
    }

    const hashPassword = await this.hashData(user.password);
    const newUser = await this.usersService.create({
      ...user,
      password: hashPassword,
    });
    const tokens = await this.getTokens(newUser.id, newUser.username);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    const { password, ...userInfo } = newUser;
    return { ...userInfo, tokens };
  }

  async logout(userId: string) {
    await this.usersService.update(userId, { refreshToken: null });
    return { result: 'Success' };
  }

  async hashData(data: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.JWT_ACCESS_SECRET,
          expiresIn: jwtConstants.ACCESS_TOKEN_EXP || '30m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.JWT_REFRESH_SECRET,
          expiresIn: jwtConstants.REFRESH_TOKEN_EXP || '3d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
}
