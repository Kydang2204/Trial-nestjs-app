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
  CheckAuthMiddleware,
} from 'src/common/middleware/check-auth.middleware';

import {
  CheckIdMiddleware,
} from 'src/common/middleware/check-id.middleware';

import {
  UserController,
} from './user.controller';

import {
  UserService,
} from './user.service';

import {
  UserSchema,
} from '../schemas/schema.user';

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
      .apply(CheckAuthMiddleware)
      .forRoutes(UserController)
      .apply(CheckIdMiddleware)
      .exclude(
        {
          path: 'users', method: RequestMethod.GET,
        },
        {
          path: 'users', method: RequestMethod.POST,
        },
      )
      .forRoutes(UserController);
  }
}
