import {
  Module, NestModule, MiddlewareConsumer, RequestMethod,
} from '@nestjs/common';

import {
  MongooseModule,
} from '@nestjs/mongoose';

import {
  AuthService,
} from 'src/auth/auth.service';

import {
  VerifyToken,
} from 'src/common/middleware/verify-token.middleware';

import {
  UserController,
} from './user.controller';

import {
  UserService,
} from './user.service';

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
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer):void {
    consumer
      .apply(VerifyToken)
      .forRoutes(UserController)
      .apply(VerifyToken, CheckEmailDuplicateMiddleware)
      .forRoutes({
        path: 'users', method: RequestMethod.POST,
      });
  }
}
