import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsOptional()
  image: string;
}
