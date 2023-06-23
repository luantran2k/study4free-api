import { Exam, ExamType } from '@prisma/client';
import { SectionsEntity } from './section.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ExamEntity implements Exam {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  duration: number;

  @ApiProperty({ enum: ['IELTS', 'TOEIC', 'TOEFL', 'CEFR'] })
  type: ExamType;

  @ApiProperty()
  isNeedPaid: boolean;

  @ApiProperty()
  image: string;

  @ApiProperty()
  sections: SectionsEntity;

  @ApiProperty()
  sectionsId: string;

  @ApiProperty()
  tag: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
