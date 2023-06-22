import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AccessTokenGuard } from './accessToken.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterRespone } from './interfaces/register';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Get('logout')
  logout(@Request() req) {
    console.log(req.user);
    return req.user;
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
