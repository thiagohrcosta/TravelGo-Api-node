import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller('api/v1')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prismaService: PrismaService,
  ) {}

  @Get('/hello')
  index(): string {
    return this.appService.getHello();
  }
}