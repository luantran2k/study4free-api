import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}
  create(userId: string, createTodoDto: CreateTodoDto) {
    if (createTodoDto.time) {
      createTodoDto.time = new Date(createTodoDto.time);
    }
    return this.prisma.todo.create({
      data: {
        ...createTodoDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.todo.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.todo.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  remove(id: string) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
