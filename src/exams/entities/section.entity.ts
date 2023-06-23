import { ApiProperty } from '@nestjs/swagger';
import { ExamSections } from '@prisma/client';

export class SectionsEntity implements ExamSections {
  @ApiProperty()
  id: string;
  @ApiProperty()
  listeningSectionId: string;
  @ApiProperty()
  readingSectionId: string;
  @ApiProperty()
  speakingSectionId: string;
  @ApiProperty()
  writtingSectionId: string;
}
