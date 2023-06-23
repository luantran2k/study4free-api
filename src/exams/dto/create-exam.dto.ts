import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '@prisma/client';

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
  @ApiProperty({ required: true })
  type: string;
  @ApiProperty({
    required: true,
    isArray: true,
    enum: ['listening', 'reading', 'speaking', 'writting'],
  })
  sections: string[];
}
