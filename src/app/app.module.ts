import {
  Module,
} from '@nestjs/common';

import {
  MongooseModule,
} from '@nestjs/mongoose';

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
  imports: [UserModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/database')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
