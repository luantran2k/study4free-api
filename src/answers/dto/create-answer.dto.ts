import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export default class CreateAnswerDto {
  @ApiProperty()
  value: string;

  @ApiProperty()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsOptional()
  audio?: string;
}
