import { BadRequestException, Injectable } from '@nestjs/common';
import { SectionType } from 'src/exams/types/sections.type';
import { PrismaService } from 'src/prisma/prisma.service';
import CreateAnswerDto from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswersService {
  constructor(private readonly prisma: PrismaService) {}
  create(
    section: SectionType,
    questionId: string,
    createAnswerDto: CreateAnswerDto,
  ) {
    switch (section) {
      case 'Listening':
        return this.prisma.listeningAnswer.create({
          data: {
            ...createAnswerDto,
            listeningQuestion: {
              connect: { id: questionId },
            },
          },
        });
      case 'Reading':
        return this.prisma.readingAnswer.create({
          data: {
            ...createAnswerDto,
            readingQuestion: {
              connect: { id: questionId },
            },
          },
        });
      case 'Speaking':
        return this.prisma.speakingAnswer.create({
          data: {
            ...createAnswerDto,
            speakingQuestion: {
              connect: { id: questionId },
            },
          },
        });
      case 'Writing':
        return this.prisma.writingAnswer.create({
          data: {
            ...createAnswerDto,
            writingQuestion: {
              connect: { id: questionId },
            },
          },
        });
      default:
        throw new BadRequestException('Invalid section type');
    }
  }

  update(id: string, section: SectionType, updateAnswerDto: UpdateAnswerDto) {
    switch (section) {
      case 'Listening':
        return this.prisma.listeningAnswer.update({
          where: { id },
          data: {
            ...updateAnswerDto,
          },
        });
      case 'Reading':
        return this.prisma.readingAnswer.update({
          where: { id },
          data: {
            ...updateAnswerDto,
          },
        });
      case 'Speaking':
        return this.prisma.speakingAnswer.update({
          where: { id },
          data: {
            ...updateAnswerDto,
          },
        });
      case 'Writing':
        return this.prisma.writingAnswer.update({
          where: { id },
          data: {
            ...updateAnswerDto,
          },
        });
      default:
        throw new BadRequestException('Invalid section type');
    }
  }

  remove(id: string, section: SectionType) {
    switch (section) {
      case 'Listening':
        return this.prisma.listeningAnswer.delete({
          where: { id },
        });
      case 'Reading':
        return this.prisma.readingAnswer.delete({
          where: { id },
        });
      case 'Speaking':
        return this.prisma.speakingAnswer.delete({
          where: { id },
        });
      case 'Writing':
        return this.prisma.writingAnswer.delete({
          where: { id },
        });
      default:
        throw new BadRequestException('Invalid section type');
    }
  }
}
