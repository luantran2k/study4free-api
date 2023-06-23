import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class ExamFilter
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

  @ApiProperty({ required: false, default: 0 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  readonly page?: number = 0;

  @ApiProperty({ required: false, default: 10 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  readonly quantity?: number = 10;
}
