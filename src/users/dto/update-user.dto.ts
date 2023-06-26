import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Role, User } from '@prisma/client';

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

interface IUser {
  username: string;
  email: string;
  gender: string;
  phone: string;
  avatar: string;
  payment: boolean;
  company: string;
  location: string;
  id: string;
  roles: Role[];
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
