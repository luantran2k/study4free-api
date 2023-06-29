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
      data: {
        ...exam,
        sections: {
          create: {
            listening: sections.includes('Listening')
              ? {
                  create: {},
                }
              : {},
            reading: sections.includes('Reading')
              ? {
                  create: {},
                }
              : {},
            speaking: sections.includes('Speaking')
              ? {
                  create: {},
                }
              : {},
            writing: sections.includes('Writing')
              ? {
                  create: {},
                }
              : {},
          },
        },
      },
    });
    return newExam;
  }

  getExamFilter(examFilter: ExamFilter) {
    const { description, isNeedPaid, title, type } = examFilter;
    return {
      AND: [
        title ? { title: { contains: title } } : {},
        description ? { description: { contains: description } } : {},
        isNeedPaid ? { isNeedPaid: isNeedPaid } : {},
        type ? { type: { equals: ExamType[type] } } : {},
      ],
    };
  }
  findAll(examFilter: ExamFilter) {
    const { page, quantity } = examFilter;
    return this.prisma.exam.findMany({
      take: quantity,
      skip: page * quantity,
      orderBy: { createdAt: 'desc' },
      where: this.getExamFilter(examFilter),
      include: {
        sections: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const exam = await this.prisma.exam.findFirst({
        where: { id },
        include: {
          sections: {
            include: {
              listening: {
                include: {
                  parts: {
                    include: {
                      questions: {
                        include: {
                          answers: true,
                        },
                      },
                    },
                  },
                },
              },
              reading: {
                include: {
                  parts: {
                    include: {
                      questions: {
                        include: {
                          answers: true,
                        },
                      },
                    },
                  },
                },
              },
              speaking: {
                include: {
                  parts: {
                    include: {
                      questions: {
                        include: {
                          answers: true,
                        },
                      },
                    },
                  },
                },
              },
              writing: {
                include: {
                  parts: {
                    include: {
                      questions: {
                        include: {
                          answers: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          _count: {
            select: {
              UserDoingExam: true,
            },
          },
        },
      });
      return exam;
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

  async countExam(examFilter: ExamFilter) {
    return {
      count: await this.prisma.exam.count({
        where: this.getExamFilter(examFilter),
      }),
    };
  }
}
