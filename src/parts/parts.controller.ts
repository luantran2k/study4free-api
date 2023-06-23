import { SectionType } from 'src/exams/types/sections.type';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/auth.decorator';

@ApiTags('Parts')
@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post(':section')
  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  @Public()
  create(
    @Param('section') section: SectionType,
    @Body() createPartDto: CreatePartDto,
  ) {
    return this.partsService.create(section, createPartDto);
  }

  @Patch(':section/:id')
  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  update(
    @Param('section') section: SectionType,
    @Param('id') id: string,
    @Body() updatePartDto: UpdatePartDto,
  ) {
    return this.partsService.update(id, section, updatePartDto);
  }

  @Delete(':section/:id')
  remove(@Param('section') section: SectionType, @Param('id') id: string) {
    return this.partsService.remove(id, section);
  }
}
