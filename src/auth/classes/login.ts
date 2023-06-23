import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from './tokens';

export class LoginResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty({
    enum: ['man', 'woman', 'other'],
  })
  gender: 'man' | 'woman' | 'other';
  @ApiProperty()
  payment: boolean;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty({ type: Tokens })
  tokens: Tokens;
}
