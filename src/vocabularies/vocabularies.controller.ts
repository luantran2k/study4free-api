import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabulariesService } from './vocabularies.service';

@ApiTags('Vocabularies')
@Controller('vocabularies')
@ApiBearerAuth()
export class VocabulariesController {
  constructor(private readonly vocabulariesService: VocabulariesService) {}

  @Post()
  create(@Body() createVocabularyDto: CreateVocabularyDto) {
    return this.vocabulariesService.create(createVocabularyDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVocabularyDto: UpdateVocabularyDto,
  ) {
    return this.vocabulariesService.update(id, updateVocabularyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocabulariesService.remove(id);
  }
}
