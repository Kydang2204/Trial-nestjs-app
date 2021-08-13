import {
  Controller, Get,
} from '@nestjs/common';

import {
  _AppService,
} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly AppService:_AppService) {}

  @Get()
  hello():string {
    return this.AppService.getHello();
  }
}
