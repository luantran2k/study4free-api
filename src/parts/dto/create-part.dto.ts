import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePartDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: 'file',
  })
  @IsOptional()
  audio?: string;

  @ApiProperty({
    type: 'file',
  })
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsOptional()
  type: string;

  @ApiProperty()
  sectionId: string;
}
