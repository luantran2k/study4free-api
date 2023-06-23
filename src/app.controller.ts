import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/auth.decorator';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Public()
  @Get()
  getHello(@Request() req) {
    console.log(req.user);
    return this.appService.getHello();
  }
}
