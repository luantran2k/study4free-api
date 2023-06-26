import { BadRequestException, Injectable } from '@nestjs/common';
import { SectionType } from 'src/exams/types/sections.type';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class PartsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}
  create(section: SectionType, createPartDto: CreatePartDto) {
    const { sectionId, audio, type, ...part } = createPartDto;
    switch (section) {
      case 'Listening':
        return this.prisma.listeningPart.create({
          data: {
            ...part,
            audio,
            type,
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
            type,
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

  async update(
    id: string,
    section: SectionType,
    updatePartDto: UpdatePartDto,
    files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
  ) {
    const { audio, image } = files;
    let audioPromise: UploadApiResponse | UploadApiErrorResponse;
    let imagePromise: UploadApiResponse | UploadApiErrorResponse;
    if (audio) {
      audioPromise = await this.cloudinary.uploadFile(audio[0], {
        folderName: 'parts/audios',
      });
    }
    if (image) {
      imagePromise = await this.cloudinary.uploadFile(image[0], {
        folderName: 'parts/images',
      });
    }

    const [newAudio, newImage] = await Promise.all([
      audioPromise,
      imagePromise,
    ]);
    if (newAudio && section === 'Listening') {
      updatePartDto.audio = newAudio.secure_url;
    }
    if (newImage) {
      updatePartDto.image = newImage.secure_url;
    }
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

  findOne(section: SectionType, id: string) {
    const findCondition = {
      where: {
        id,
      },
      include: {
        questions: {
          select: {
            id: true,
          },
        },
      },
    };
    switch (section) {
      case 'Listening':
        return this.prisma.listeningPart.findUnique(findCondition);
      case 'Reading':
        return this.prisma.readingPart.findUnique(findCondition);
      case 'Speaking':
        return this.prisma.speakingPart.findUnique(findCondition);
      case 'Writing':
        return this.prisma.writingPart.findUnique(findCondition);
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
