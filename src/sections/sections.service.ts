import { BadRequestException, Injectable } from '@nestjs/common';
import { SectionType } from 'src/exams/types/sections.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionsService {
  constructor(private readonly prisma: PrismaService) {}
  create({ examSectionId, section }: CreateSectionDto) {
    const createData = {
      data: {
        examSections: {
          connect: { id: examSectionId },
        },
      },
    };
    switch (section) {
      case 'Listening':
        return this.prisma.listeningSection.create(createData);
      case 'Reading':
        return this.prisma.readingSection.create(createData);
      case 'Speaking':
        return this.prisma.speakingSection.create(createData);
      case 'Writing':
        return this.prisma.writingSection.create(createData);
      default:
        throw new BadRequestException('Section invalid');
    }
  }

  findOne(id: string, section: SectionType) {
    const findCondition = {
      where: { id },
      include: {
        parts: {
          select: {
            id: true,
          },
        },
      },
    };
    switch (section) {
      case 'Listening':
        return this.prisma.listeningSection.findFirst(findCondition);
      case 'Reading':
        return this.prisma.readingSection.findFirst(findCondition);
      case 'Speaking':
        return this.prisma.speakingSection.findFirst(findCondition);
      case 'Writing':
        return this.prisma.writingSection.findFirst(findCondition);
      default:
        throw new BadRequestException('Section invalid');
    }
  }

  remove(id: string, section: SectionType) {
    const deleteCondition = {
      where: { id },
    };
    switch (section) {
      case 'Listening':
        return this.prisma.listeningSection.delete(deleteCondition);
      case 'Reading':
        return this.prisma.readingSection.delete(deleteCondition);
      case 'Speaking':
        return this.prisma.speakingSection.delete(deleteCondition);
      case 'Writing':
        return this.prisma.writingSection.delete(deleteCondition);
      default:
        throw new BadRequestException('Section invalid');
    }
  }
}
