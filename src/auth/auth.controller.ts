import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Public } from './decorators/auth.decorator';
import { AuthService } from './auth.service';
import { LoginResponse } from './classes/login';
import { RegisterRespone } from './classes/register';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @ApiOkResponse({
    type: LoginResponse,
  })
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  @ApiCreatedResponse({
    type: RegisterRespone,
    description: 'The record has been successfully created.',
  })
  @ApiConflictResponse({
    schema: {
      example: {
        message: 'This username is already taken',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  })
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Get('logout')
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Logged out successfully' })
  logout(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
