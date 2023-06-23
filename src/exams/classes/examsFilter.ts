import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isNeedPaid?: boolean;

  @ApiProperty({ required: false, default: 0 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, default: 10 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  quantity?: number;
}
