import { ApiProperty } from '@nestjs/swagger';
import { SectionType } from 'src/exams/types/sections.type';

export class CreateSectionDto {
  @ApiProperty()
  section: SectionType;

  @ApiProperty()
  examSectionId: string;
}
