import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { SectionType } from 'src/exams/types/sections.type';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartsService {
  constructor(private readonly prisma: PrismaService) {}
  create(section: SectionType, createPartDto: CreatePartDto) {
    const { sectionId, ...part } = createPartDto;
    switch (section) {
      case 'Listening':
        return this.prisma.listeningPart.create({
          data: {
            ...part,
            listeningSection: {
              connect: {
                id: sectionId,
              },
            },
          },
        });
      case 'Reading':
        return this.prisma.readingPart.create({
          data: {
            ...part,
            readingSection: {
              connect: {
                id: sectionId,
              },
            },
          },
        });
      case 'Speaking':
        return this.prisma.speakingPart.create({
          data: {
            ...part,
            speakingSection: {
              connect: {
                id: sectionId,
              },
            },
          },
        });
      case 'Writing':
        return this.prisma.writingPart.create({
          data: {
            ...part,
            writingSection: {
              connect: {
                id: sectionId,
              },
            },
          },
        });
      default:
        throw new BadRequestException('Invalid section type');
    }
  }

  update(id: string, section: SectionType, updatePartDto: UpdatePartDto) {
    switch (section) {
      case 'Listening':
        return this.prisma.listeningPart.update({
          where: {
            id,
          },
          data: {
            ...updatePartDto,
          },
        });
      case 'Reading':
        return this.prisma.readingPart.update({
          where: {
            id,
          },
          data: {
            ...updatePartDto,
          },
        });
      case 'Speaking':
        return this.prisma.speakingPart.update({
          where: {
            id,
          },
          data: {
            ...updatePartDto,
          },
        });
      case 'Writing':
        return this.prisma.writingPart.update({
          where: {
            id,
          },
          data: {
            ...updatePartDto,
          },
        });
      default:
        throw new BadRequestException('Invalid section type');
    }
  }

  remove(id: string, section: SectionType) {
    switch (section) {
      case 'Listening':
        return this.prisma.listeningPart.delete({
          where: {
            id,
          },
        });
      case 'Reading':
        return this.prisma.readingPart.delete({
          where: {
            id,
          },
        });
      case 'Speaking':
        return this.prisma.speakingPart.delete({
          where: {
            id,
          },
        });
      case 'Writing':
        return this.prisma.writingPart.delete({
          where: {
            id,
          },
        });
      default:
        throw new BadRequestException('Invalid section type');
    }
  }
}
