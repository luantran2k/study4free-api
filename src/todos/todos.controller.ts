import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRequestType } from 'src/auth/types/auth-request.type';

@ApiTags('Todos')
@ApiBearerAuth()
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @Request() req: AuthRequestType,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todosService.create(req.user.sub, createTodoDto);
  }

  @Get()
  findAll(@Request() req: AuthRequestType) {
    return this.todosService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
