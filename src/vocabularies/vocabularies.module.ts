import { Module } from '@nestjs/common';
import { VocabulariesService } from './vocabularies.service';
import { VocabulariesController } from './vocabularies.controller';

@Module({
  controllers: [VocabulariesController],
  providers: [VocabulariesService]
})
export class VocabulariesModule {}
