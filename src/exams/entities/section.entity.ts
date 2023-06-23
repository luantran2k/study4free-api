import { ApiProperty } from '@nestjs/swagger';
import { ExamSections } from '@prisma/client';

export class SectionsEntity implements ExamSections {
  writingSectionId: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  listeningSectionId: string;
  @ApiProperty()
  readingSectionId: string;
  @ApiProperty()
  speakingSectionId: string;
}
