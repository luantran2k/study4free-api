import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...user,
        avatar:
          'https://res.cloudinary.com/dfyxzs4xp/image/upload/v1687404987/study4free/avatar/defaut/ko4j5narqakiodes4zte.png',
        gender: 'man',
      },
    });
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findOneByUserName(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: { username },
    });
  }

  async update(id: string, user: Partial<User>) {
    return this.prisma.user.update({
      where: { id },
      data: { ...user },
    });
  }
  async isValidUser({
    username,
    email,
  }: CreateUserDto): Promise<{ isValid: boolean; message?: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (!user) {
      return { isValid: true };
    }

    if (user.username === username) {
      return {
        isValid: false,
        message: 'This username is already taken',
      };
    } else if (user.email === email) {
      return {
        isValid: false,
        message: 'This email is already taken',
      };
    }
  }
}
