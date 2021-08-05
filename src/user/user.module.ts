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
  UserController,
} from './user.controller';

import {
  UserService,
} from './user.service';

import {
  UserSchema,
} from '../schemas/schema.user';

import {
  ValidateEmailMiddleware,
} from '../common/middleware/validate-email.middleware';

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
      .apply(ValidateEmailMiddleware)
      .forRoutes({
        path: 'users', method: RequestMethod.POST,
      });
  }
}
