import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrsimaService } from './prisma/prisma.service';

@Controller('api/v1')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrsimaService,
  ) {}

  @Get('/hello')
  index(): string {
    return this.appService.getHello();
  }
}