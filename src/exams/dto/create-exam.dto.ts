import { ApiProperty } from '@nestjs/swagger';
import { Exam, ExamType } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { SectionType } from '../types/sections.type';

export class CreateExamDto
  implements
    Pick<Exam, 'title' | 'description' | 'duration' | 'type' | 'image'>
{
  @ApiProperty({ required: false })
  image: string;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: true })
  duration: number;

  @ApiProperty({
    required: true,
    enum: ['IELTS', 'TOEIC', 'TOEFL', 'CEFR'],
  })
  @IsEnum(['IELTS', 'TOEIC', 'TOEFL', 'CEFR'])
  type: ExamType;

  @ApiProperty({
    required: true,
    isArray: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  sections: SectionType[];
}
