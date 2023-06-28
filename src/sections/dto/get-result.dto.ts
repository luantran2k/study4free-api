import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SectionType } from 'src/exams/types/sections.type';
import ISectionResponse, { QuestionType } from '../interfaces/SectionResponse';

export default class SectionResponse implements ISectionResponse {
  @ApiProperty()
  id: string;

  @ApiProperty({
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  @IsEnum(['Listening', 'Reading', 'Speaking', 'Writing'])
  section: SectionType;

  @ApiProperty({ isArray: true })
  questions: QuestionResponse[];
}

class QuestionResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  questionType: QuestionType;

  @ApiProperty({
    isArray: true,
  })
  answers: AnswerResponse[];
}

class AnswerResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsOptional()
  value?: string;

  @ApiProperty()
  @IsOptional()
  isTrue?: boolean;
}
