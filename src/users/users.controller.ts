import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/auth.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilter } from './user-filter';
import { UsersService } from './users.service';
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @Public()
  findAll(@Query() UserFilter: UserFilter) {
    return this.usersService.findMany(UserFilter);
  }

  @Public()
  @Get('count')
  countUsers(@Query() UserFilter: UserFilter) {
    return this.usersService.countUsers(UserFilter);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.usersService.remove(id);
  }
}
