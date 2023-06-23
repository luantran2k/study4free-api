import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from './tokens';

export class RegisterRespone {
  @ApiProperty({
    type: Tokens,
  })
  tokens: Tokens;
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty({
    enum: ['man', 'woman', 'other'],
  })
  gender: 'man' | 'woman' | 'other';
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
