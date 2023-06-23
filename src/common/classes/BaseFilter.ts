import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export default class BaseFilter {
  @ApiProperty({ required: false, default: 0 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  readonly page?: number = 0;

  @ApiProperty({ required: false, default: 10 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  readonly quantity?: number = 10;

  @ApiProperty()
  @IsOptional()
  search?: string;
}
