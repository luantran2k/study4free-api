import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SectionType } from 'src/exams/types/sections.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}
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
            listeningPart: {
              connect: { id: partId },
            },
          },
        });
      case 'Reading':
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

  findOne(id: string, section: SectionType) {
    const findCondition = {
      where: { id },
      include: {
        answers: true,
      },
    };
    switch (section) {
      case 'Listening':
        return this.prisma.listeningQuestion.findFirst(findCondition);
      case 'Reading':
        return this.prisma.readingQuestion.findFirst(findCondition);
      case 'Speaking':
        return this.prisma.speakingQuestion.findFirst(findCondition);
      case 'Writing':
        return this.prisma.writingQuestion.findFirst(findCondition);
      default:
        throw new BadRequestException('Section or part invalid');
    }
  }
  async update(
    id: string,
    section: SectionType,
    updateQuestionDto: UpdateQuestionDto,
    files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
  ) {
    const { audio, image } = files;
    let audioPromise: UploadApiResponse | UploadApiErrorResponse;
    let imagePromise: UploadApiResponse | UploadApiErrorResponse;
    if (audio) {
      audioPromise = await this.cloudinary.uploadFile(audio[0], {
        folderName: 'questions/audios',
      });
    }
    if (image) {
      imagePromise = await this.cloudinary.uploadFile(image[0], {
        folderName: 'questions/images',
      });
    }

    const [newAudio, newImage] = await Promise.all([
      audioPromise,
      imagePromise,
    ]);
    if (newAudio && section === 'Listening') {
      updateQuestionDto.audio = newAudio.secure_url;
    }
    if (newImage) {
      updateQuestionDto.image = newImage.secure_url;
    }
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
