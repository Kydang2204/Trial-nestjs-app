import {
  Module,
} from '@nestjs/common';

import {
  MongooseModule,
} from '@nestjs/mongoose';

import {
  AuthController,
} from './auth.controller';

import {
  _AuthService,
} from './auth.service';

import {
  UserSchema,
} from '../schema/schema.user';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User', schema: UserSchema,
  }])],
  controllers: [AuthController],
  providers: [_AuthService],
  exports: [_AuthService],
})
export class AuthModule {}
