import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '@prisma/client';

export class ExamFilter
  implements Pick<Exam, 'isNeedPaid' | 'title' | 'type' | 'description'>
{
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  isNeedPaid: boolean;
  @ApiProperty()
  page: number;
  @ApiProperty()
  quantity: number;
}
