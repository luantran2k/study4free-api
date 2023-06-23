import { Injectable } from '@nestjs/common';
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
    console.log('title', title);
    return this.prisma.exam.findMany({
      take: quantity,
      skip: page * quantity,
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
