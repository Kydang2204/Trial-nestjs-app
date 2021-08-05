import {
  Module, MiddlewareConsumer, NestModule,
} from '@nestjs/common';

import {
  MongooseModule,
} from '@nestjs/mongoose';

import {
  AuthController,
} from './auth.controller';

import {
  AuthService,
} from './auth.service';

import {
  UserSchema,
} from '../schemas/schema.user';

import {
  CheckEmailDuplicateMiddleware,
} from '../common/middleware/check-email-duplicate.middleware';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User', schema: UserSchema,
  }])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer):void {
    consumer
      .apply(CheckEmailDuplicateMiddleware)
      .forRoutes('auth/register');
  }
}
