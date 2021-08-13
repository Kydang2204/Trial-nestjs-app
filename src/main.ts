import {
  NestFactory,
} from '@nestjs/core';

import {
  ValidationPipe,
} from '@nestjs/common';

import {
  AppModule,
} from 'src/app/app.module';

import {
  ErrorFilter,
} from './common/exception/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ErrorFilter());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}

bootstrap();
