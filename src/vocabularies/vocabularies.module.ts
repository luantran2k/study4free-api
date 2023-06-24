import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VocabulariesController } from './vocabularies.controller';
import { VocabulariesService } from './vocabularies.service';

@Module({
  imports: [PrismaModule],
  controllers: [VocabulariesController],
  providers: [VocabulariesService],
})
export class VocabulariesModule {}
