import { Exam } from '@prisma/client';
import { SectionsEntity } from './section.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ExamEnity implements Exam {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  type: string;
  @ApiProperty()
  isNeedPaid: boolean;
  @ApiProperty()
  image: string;
  @ApiProperty()
  sections: SectionsEntity;
  @ApiProperty()
  sectionsId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
