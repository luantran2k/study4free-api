import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilter } from './user-filter';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  findMany({ page = 0, quantity = 10, search = '' }: UserFilter) {
    return this.prisma.user.findMany({
      take: quantity,
      skip: page * quantity,
      where: {
        OR: [
          { username: { contains: search } },
          { email: { contains: search } },
        ],
      },
      select: {
        id: true,
        avatar: true,
        gender: true,
        username: true,
        email: true,
        payment: true,
      },
    });
  }
  async countUsers({ search = '' }) {
    return {
      count: await this.prisma.user.count({
        where: {
          OR: [
            { username: { contains: search } },
            { email: { contains: search } },
          ],
        },
      }),
    };
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...user,
        avatar: await this.getRandomAvatar(),
        gender: 'man',
      },
    });
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: {
        collections: true,
        todos: true,
        userDoingExam: true,
      },
    });
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  async findOneByUserName(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: { username },
    });
  }

  update(id: string, user: UpdateUserDto & { refreshToken?: string }) {
    return this.prisma.user.update({
      where: { id },
      data: { ...user },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
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

  async getRandomAvatar() {
    const fileInfo = await this.cloudinary.getAllFileInFolder(
      'study4free/avatar/defaut',
      {
        resourceType: 'image',
      },
    );
    const numberOfFiles = fileInfo.total_count;
    const randomNumber = Math.floor(Math.random() * numberOfFiles);
    return fileInfo.resources[randomNumber].url;
  }
}
