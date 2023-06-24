import { PartialType } from '@nestjs/swagger';
import BaseFilter from 'src/common/classes/BaseFilter';

export class UserFilter extends PartialType(BaseFilter) {}
