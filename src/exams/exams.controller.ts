import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Public } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ExamFilter } from './classes/examsFilter';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamEntity } from './entities/exam.entity';
import { ExamsService } from './exams.service';

@ApiTags('Exams')
@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  create(@Body() createExamDto: CreateExamDto) {
    return this.examsService.create(createExamDto);
  }

  @Get()
  @Public()
  @ApiOkResponse({
    isArray: true,
    type: ExamEntity,
  })
  findAll(
    @Query()
    examFilter: ExamFilter,
  ) {
    return this.examsService.findAll(examFilter);
  }

  @Public()
  @Get('count')
  countExam(
    @Query()
    examFilter: ExamFilter,
  ) {
    return this.examsService.countExam(examFilter);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examsService.update(id, updateExamDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.examsService.remove(id);
  }

  @Post('/result')
  @ApiBearerAuth()
  getResult() {
    return 'Hello';
    // return this.examsService.getResult();
  }
}
