import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { SectionType } from 'src/exams/types/sections.type';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionsService } from './sections.service';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import SectionResponse from './dto/get-result.dto';
import { JwtPayload } from 'src/auth/accessToken.strategy';

@ApiTags('Sections')
@ApiBearerAuth()
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionsService.create(createSectionDto);
  }

  @Get('results/:resultId')
  getResultById(@Param('resultId') resultId: string) {
    return this.sectionsService.getResultById(resultId);
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

  @Post('result')
  async getResult(
    @Body() sectionResponse: SectionResponse,
    @Req() req: Express.Request & { user: JwtPayload },
  ) {
    console.log();
    return this.sectionsService.getResult(req.user.sub, sectionResponse);
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
