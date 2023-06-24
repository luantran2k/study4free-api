import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { SectionType } from 'src/exams/types/sections.type';
import { AnswersService } from './answers.service';
import CreateAnswerDto from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Answers')
@Controller('answers')
@ApiBearerAuth()
@Roles(Role.ADMIN)
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post(':section/:questionId')
  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  create(
    @Param('section') section: SectionType,
    @Param('questionId') questionId: string,
    @Body() createAnswerDto: CreateAnswerDto,
  ) {
    return this.answersService.create(section, questionId, createAnswerDto);
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
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.answersService.update(id, section, updateAnswerDto);
  }

  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  @Delete(':section/:id')
  remove(@Param('section') section: SectionType, @Param('id') id: string) {
    return this.answersService.remove(id, section);
  }
}
