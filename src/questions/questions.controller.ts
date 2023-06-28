import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SectionType } from 'src/exams/types/sections.type';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

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
  @Get(':section/:id')
  findOne(@Param('section') section: SectionType, @Param('id') id: string) {
    return this.questionsService.findOne(id, section);
  }

  @Patch(':section/:id')
  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  update(
    @Param('section') section: SectionType,
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      audio?: Express.Multer.File[];
    } = {},
  ) {
    return this.questionsService.update(id, section, updateQuestionDto, files);
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
