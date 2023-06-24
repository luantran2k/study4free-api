import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import BaseFilter from 'src/common/classes/BaseFilter';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}
  create(userId: string, createCollectionDto: CreateCollectionDto) {
    return this.prisma.collection.create({
      data: {
        ...createCollectionDto,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll({ page, quantity, search }: BaseFilter) {
    return this.prisma.collection.findMany({
      take: quantity,
      skip: page * quantity,
      where: {
        title: {
          contains: search,
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.collection.findFirst({
      where: {
        id,
      },
      include: {
        vocabularies: true,
      },
    });
  }

  update(id: string, updateCollectionDto: UpdateCollectionDto) {
    return this.prisma.collection.update({
      where: { id },
      data: updateCollectionDto,
    });
  }

  remove(id: string) {
    return this.prisma.collection.delete({
      where: { id },
    });
  }
}
