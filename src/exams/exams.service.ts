import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamFilter } from './classes/examsFilter';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createExamDto: CreateExamDto) {
    return 'This action adds a new exam';
  }

  findAll({
    page,
    quantity,
    description,
    isNeedPaid,
    title,
    type,
  }: ExamFilter) {
    return this.prisma.exam.findMany({
      take: quantity,
      skip: page * quantity,
      where: {
        OR: [
          {
            title: {
              contains: title,
            },
          },
          {
            description: {
              contains: description,
            },
          },
          {
            type: {
              equals: type,
            },
          },
          {
            isNeedPaid: {
              equals: isNeedPaid,
            },
          },
        ],
      },
    });
  }

  findOne(id: string) {
    return this.prisma.exam.findFirst({ where: { id } });
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
