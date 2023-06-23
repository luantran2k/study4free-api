import { Injectable, NotFoundException } from '@nestjs/common';
import { ExamType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExamFilter } from './classes/examsFilter';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { SectionType } from './types/sections.type';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExamDto: CreateExamDto) {
    const { sections, ...exam } = createExamDto;

    // const sectionsCreated = await Promise.all(
    //   sections.map(async (section: SectionType) => {
    //     switch (section) {
    //       case 'Listening':
    //         return await this.prisma.listeningSection.create({
    //           data: {},
    //         });
    //       case 'Reading':
    //         return await this.prisma.readingSection.create({
    //           data: {},
    //         });
    //       case 'Speaking':
    //         return await this.prisma.speakingSection.create({
    //           data: {},
    //         });
    //       case 'Writing':
    //         return await this.prisma.writingSection.create({
    //           data: {},
    //         });
    //     }
    //   }),
    // );
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
      return await this.prisma.exam.findFirst({
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
        },
      });
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
