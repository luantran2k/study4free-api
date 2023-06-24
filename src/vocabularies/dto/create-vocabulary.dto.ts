import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateVocabularyDto {
  @ApiProperty()
  @IsString()
  vocabulary: string;

  @ApiProperty()
  @IsString()
  meaning: string;

  @ApiProperty()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsOptional()
  spelling?: string;

  @ApiProperty({
    isArray: true,
  })
  @IsOptional()
  synonyms?: string[];

  @ApiProperty()
  collectionId: string;
}
