import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsOptional()
  avatar?: string;

  @ApiProperty()
  @IsOptional()
  payment?: boolean;

  @ApiProperty()
  @IsOptional()
  company?: string;

  @ApiProperty()
  @IsOptional()
  location?: string;
}
