import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserFilter } from './user-filter';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  findMany({ page, quantity, search }: UserFilter) {
    return this.prisma.user.findMany({
      take: quantity,
      skip: page * quantity,
      where: {
        AND: [
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
      },
    });
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
        userDoingExam: {
          include: {
            exam: {
              select: {
                id: true,
                title: true,
                image: true,
                type: true,
                duration: true,
                isNeedPaid: true,
                tag: true,
              },
            },
          },
        },
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

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
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
