import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
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
  @Public()
  @ApiParam({
    name: 'section',
    required: true,
    enum: ['Listening', 'Reading', 'Speaking', 'Writing'],
  })
  findOne(
    @Param('section') section: SectionType,
    @Param('id') id: string,
    @Query('detail', new DefaultValuePipe(false)) detail: boolean,
  ) {
    return this.partsService.findOne(section, id, detail);
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
    @Body() updatePartDto: UpdatePartDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; audio?: Express.Multer.File[] },
  ) {
    return this.partsService.update(id, section, updatePartDto, files);
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
