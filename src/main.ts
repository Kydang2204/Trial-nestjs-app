import {
  NestFactory,
} from '@nestjs/core';

import {
  AppModule,
} from 'src/app/app.module';

import {
  AllExceptionsFilter,
} from './common/exception/validate-all.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(5000);
}

bootstrap();
