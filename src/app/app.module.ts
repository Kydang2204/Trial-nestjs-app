import {
  Module, MiddlewareConsumer, NestModule, RequestMethod,
} from '@nestjs/common';

import {
  MongooseModule,
} from '@nestjs/mongoose';

import {
  AuthModule,
} from 'src/auth/auth.module';

import {
  UserModule,
} from '../user/user.module';

import {
  AppController,
} from './app.controller';

import {
  AppService,
} from './app.service';

@Module({
  imports: [UserModule, AuthModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/database', {
    useFindAndModify: false, useCreateIndex: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
