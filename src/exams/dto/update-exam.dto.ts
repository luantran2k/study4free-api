import { PartialType } from '@nestjs/mapped-types';
import { CreateExamDto } from './create-exam.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateExamDto extends PartialType(
  OmitType(CreateExamDto, ['sections']),
) {}
