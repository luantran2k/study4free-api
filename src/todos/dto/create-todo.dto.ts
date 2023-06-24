import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  todo: string;

  @ApiProperty()
  time: Date;

  @ApiProperty()
  @IsOptional()
  readonly completed: boolean = false;
}
