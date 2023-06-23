import { Injectable, NotFoundException } from '@nestjs/common';
import { ExamType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExamFilter } from './classes/examsFilter';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExamDto: CreateExamDto) {
    const { sections, ...exam } = createExamDto;

    const newExam = await this.prisma.exam.create({
      data: exam,
    });
    await Promise.all(
      sections.map(
        async (section: 'listening' | 'reading' | 'speaking' | 'writing') => {
          switch (section) {
            case 'listening':
              return this.prisma.listeningSection.create({});
            case 'reading':
              return this.prisma.readingSection.create({});
            case 'speaking':
              return this.prisma.speakingSection.create({});
            case 'writing':
              return this.prisma.writingSection.create({});
          }
        },
      ),
    );
    return newExam;
  }

  findAll(examFilter: ExamFilter) {
    const { page, quantity, description, isNeedPaid, title, type } = examFilter;
    return this.prisma.exam.findMany({
      take: quantity,
      skip: page * quantity,
      orderBy: { createdAt: 'desc' },
      where: {
        AND: [
          title ? { title: { contains: title } } : {},
          description ? { description: { contains: description } } : {},
          isNeedPaid ? { isNeedPaid: isNeedPaid } : {},
          type ? { type: { equals: ExamType[type] } } : {},
        ],
      },
    });
  }

  async findOne(id: string) {
    try {
      return await this.prisma.exam.findFirst({ where: { id } });
    } catch {
      throw new NotFoundException('Exam not found');
    }
  }

  async update(id: string, updateExamDto: UpdateExamDto) {
    try {
      return await this.prisma.exam.update({
        where: { id },
        data: updateExamDto,
      });
    } catch {
      throw new NotFoundException('Exam updated failed');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.exam.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Exam not found');
    }
  }
}
