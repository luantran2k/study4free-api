import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SectionType } from 'src/exams/types/sections.type';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';

@ApiTags('Questions')
@Controller('questions')
@ApiBearerAuth()
@Roles(Role.ADMIN)
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post(':section/:partId')
  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  create(
    @Param('section') section: SectionType,
    @Param('partId') partId: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.create(section, partId, createQuestionDto);
  }

  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  @Patch(':section/:id')
  update(
    @Param('section') section: SectionType,
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, section, updateQuestionDto);
  }

  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  @Delete(':section/:id')
  remove(@Param('section') section: SectionType, @Param('id') id: string) {
    return this.questionsService.remove(id, section);
  }
}
