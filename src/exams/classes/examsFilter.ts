import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import BaseFilter from 'src/common/classes/BaseFilter';

export class ExamFilter
  extends BaseFilter
  implements
    Partial<Pick<Exam, 'isNeedPaid' | 'title' | 'type' | 'description'>>
{
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, enum: ['IELTS', 'TOEIC', 'TOEFL', 'CEFR'] })
  @IsEnum(['IELTS', 'TOEIC', 'TOEFL', 'CEFR'])
  @IsOptional()
  type?: 'IELTS' | 'TOEIC' | 'TOEFL' | 'CEFR';

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : false))
  isNeedPaid?: boolean;
}
