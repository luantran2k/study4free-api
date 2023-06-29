import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import BaseFilter from 'src/common/classes/BaseFilter';
import { Public } from 'src/auth/decorators/auth.decorator';
import { AuthRequestType } from 'src/auth/types/auth-request.type';

@ApiTags('Collections')
@Controller('collections')
@ApiBearerAuth()
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  create(
    @Req() req: AuthRequestType,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    return this.collectionsService.create(req.user.sub, createCollectionDto);
  }

  @Get('count')
  @Public()
  count(@Query() collecitonFilter: BaseFilter) {
    return this.collectionsService.count(collecitonFilter);
  }

  @Get()
  @Public()
  findAll(@Query() collecitonFilter: BaseFilter) {
    return this.collectionsService.findAll(collecitonFilter);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionsService.remove(id);
  }
}
