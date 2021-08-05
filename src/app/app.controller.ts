import {
  UseFilters,
  Controller, Get,
} from '@nestjs/common';

import {
  AppService,
} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly AppService:AppService) {}

  @Get()
  hello():string {
    return this.AppService.getHello();
  }
}
