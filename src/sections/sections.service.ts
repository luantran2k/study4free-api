import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SectionType } from './../exams/types/sections.type';
import { CreateSectionDto } from './dto/create-section.dto';
import SectionResponse from './interfaces/SectionResponse';
import IAnswer from 'src/answers/interfaces/answer';
import { MultipleChoiceQuestion } from 'src/questions/entities/multipleChoice';
import IMultipleChoiceAnswer from 'src/answers/interfaces/multipleChoiceAnswer';
import ISingleChoiceAnswer from 'src/answers/interfaces/singleChoiceAnswer';
import IGapFillingAnswer from 'src/answers/interfaces/gapFillingAnswer';
import { SingleChoiceQuestion } from 'src/questions/entities/singleChoice';
import { GapFillingQuestion } from 'src/questions/entities/gapFilling';

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

  async getResult(sectionResponse: SectionResponse) {
    const { section, questions } = sectionResponse;

    const questionsResultPromises = questions.map(async (userQuestion) => {
      let question: {
        answers:
          | IMultipleChoiceAnswer[]
          | ISingleChoiceAnswer[]
          | IGapFillingAnswer[];
      };
      switch (section) {
        case 'Listening':
          question = await this.prisma.listeningQuestion.findFirst({
            where: { id: userQuestion.id },
            include: {
              answers: true,
            },
          });
          break;
        case 'Reading':
          question = await this.prisma.readingQuestion.findFirst({
            where: { id: userQuestion.id },
            include: {
              answers: true,
            },
          });
          break;
        case 'Speaking':
          question = await this.prisma.speakingQuestion.findFirst({
            where: { id: userQuestion.id },
            include: {
              answers: true,
            },
          });
          break;
        case 'Writing':
          question = await this.prisma.writingQuestion.findFirst({
            where: { id: userQuestion.id },
            include: {
              answers: true,
            },
          });
          break;
      }
      if (!question) {
        throw new BadRequestException(
          `Question not found ${section} ${userQuestion.id}`,
        );
      }
      const { id, questionType, answers } = userQuestion;
      switch (questionType) {
        case 'Multiple choice':
          return new MultipleChoiceQuestion(
            id,
            question.answers as IMultipleChoiceAnswer[],
            answers as IMultipleChoiceAnswer[],
          ).validate();
        case 'Single choice':
          return new SingleChoiceQuestion(
            id,
            question.answers as ISingleChoiceAnswer[],
            answers as ISingleChoiceAnswer[],
          ).validate();
        case 'Gap filling':
          return new GapFillingQuestion(
            id,
            question.answers as IGapFillingAnswer[],
            answers as IGapFillingAnswer[],
          ).validate();
      }
    });

    const resultArray = await Promise.all(questionsResultPromises);
    const numberOfTrueQuestion = resultArray.filter((result) => result).length;
    return {
      numberOfTrueQuestion,
      totalQuestion: questions.length,
    };
  }
}
