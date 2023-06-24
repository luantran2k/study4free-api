import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Public } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { SectionType } from 'src/exams/types/sections.type';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PartsService } from './parts.service';

@ApiTags('Parts')
@Controller('parts')
@ApiBearerAuth()
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post(':section')
  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  create(
    @Param('section') section: SectionType,
    @Body() createPartDto: CreatePartDto,
  ) {
    return this.partsService.create(section, createPartDto);
  }

  @Get(':section/:id')
  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  findOne(@Param('section') section: SectionType, @Param('id') id: string) {
    return this.partsService.findOne(section, id);
  }

  @Patch(':section/:id')
  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  @Public()
  update(
    @Param('section') section: SectionType,
    @Param('id') id: string,
    @Body() updatePartDto: UpdatePartDto,
  ) {
    return this.partsService.update(id, section, updatePartDto);
  }

  @Delete(':section/:id')
  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  @Roles(Role.ADMIN)
  async remove(
    @Param('section') section: SectionType,
    @Param('id') id: string,
  ) {
    try {
      return await this.partsService.remove(id, section);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new NotFoundException("Part doesn't exist");
    }
  }
}
