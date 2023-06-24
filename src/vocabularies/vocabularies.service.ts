import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';

@Injectable()
export class VocabulariesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createVocabularyDto: CreateVocabularyDto) {
    const { collectionId, ...vocabulary } = createVocabularyDto;
    return this.prisma.vocabulary.create({
      data: {
        ...vocabulary,
        collection: {
          connect: {
            id: collectionId,
          },
        },
      },
    });
  }

  update(id: string, updateVocabularyDto: UpdateVocabularyDto) {
    return this.prisma.vocabulary.update({
      where: {
        id,
      },
      data: updateVocabularyDto,
    });
  }

  remove(id: string) {
    return this.prisma.vocabulary.delete({
      where: { id },
    });
  }
}
