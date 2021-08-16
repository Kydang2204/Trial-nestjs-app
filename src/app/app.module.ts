import {
  Module,
} from '@nestjs/common';

import {
  MongooseModule,
} from '@nestjs/mongoose';

import {
  AuthModule,
} from 'src/auth/auth.module';

import {
  APP_INTERCEPTOR,
} from '@nestjs/core';

import {
  UserModule,
} from '../user/user.module';

import {
  AppController,
} from './app.controller';

import {
  OutputInterceptor,
} from '../common/interceptor/output.interceptor';

import {
  _AppService,
} from './app.service';

@Module({
  imports: [UserModule, AuthModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/database', {
    useFindAndModify: false, useCreateIndex: true, versionKey: false,
  })],
  controllers: [AppController],
  providers: [_AppService, {
    provide: APP_INTERCEPTOR,
    useClass: OutputInterceptor,
  }],
})
export class AppModule {}
