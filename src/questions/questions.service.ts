import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SectionType } from 'src/exams/types/sections.type';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}
  create(
    section: SectionType,
    partId: string,
    createQuestionDto: CreateQuestionDto,
  ) {
    const { audio, ...question } = createQuestionDto;
    switch (section) {
      case 'Listening':
        return this.prisma.listeningQuestion.create({
          data: {
            audio,
            ...question,
          },
        });
      case 'Reading':
        this.prisma.readingQuestion
          .findFirst({ where: { id: partId } })
          .then((part) => console.log(part));

        return this.prisma.readingQuestion.create({
          data: {
            ...question,
            readingPart: {
              connect: { id: partId },
            },
          },
        });
      case 'Speaking':
        return this.prisma.speakingQuestion.create({
          data: {
            ...question,
            speakingPart: {
              connect: { id: partId },
            },
          },
        });
      case 'Writing':
        return this.prisma.writingQuestion.create({
          data: {
            ...question,
            writingPart: {
              connect: { id: partId },
            },
          },
        });
      default:
        throw new BadRequestException('Section or part invalid');
    }
  }

  update(
    id: string,
    section: SectionType,
    updateQuestionDto: UpdateQuestionDto,
  ) {
    switch (section) {
      case 'Listening':
        return this.prisma.listeningQuestion.update({
          where: { id },
          data: {
            ...updateQuestionDto,
          },
        });
      case 'Reading':
        return this.prisma.readingQuestion.update({
          where: { id },
          data: {
            ...updateQuestionDto,
          },
        });
      case 'Speaking':
        return this.prisma.speakingQuestion.update({
          where: { id },
          data: {
            ...updateQuestionDto,
          },
        });
      case 'Writing':
        return this.prisma.writingQuestion.update({
          where: { id },
          data: {
            ...updateQuestionDto,
          },
        });

      default:
        throw new BadRequestException('Section or part invalid');
    }
  }

  remove(id: string, section: SectionType) {
    switch (section) {
      case 'Listening':
        return this.prisma.listeningQuestion.delete({
          where: { id },
        });
      case 'Reading':
        return this.prisma.readingQuestion.delete({
          where: { id },
        });
      case 'Speaking':
        return this.prisma.speakingQuestion.delete({
          where: { id },
        });
      case 'Writing':
        return this.prisma.writingQuestion.delete({
          where: { id },
        });
      default:
        throw new BadRequestException('Section invalid');
    }
  }
}
