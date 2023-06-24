import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SectionType } from 'src/exams/types/sections.type';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionsService } from './sections.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Sections')
@ApiBearerAuth()
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionsService.create(createSectionDto);
  }

  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  @Get(':section/:id')
  findOne(@Param('section') section: SectionType, @Param('id') id: string) {
    return this.sectionsService.findOne(id, section);
  }

  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  @Delete(':section/:id')
  remove(@Param('section') section: SectionType, @Param('id') id: string) {
    return this.sectionsService.remove(id, section);
  }
}
