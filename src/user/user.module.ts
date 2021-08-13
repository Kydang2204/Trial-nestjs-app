import {
  Module,
} from '@nestjs/common';

import {
  MongooseModule,
} from '@nestjs/mongoose';

import {
  UserController,
} from './user.controller';

import {
  _UserService,
} from './user.service';

import {
  UserSchema,
} from '../schema/schema.user';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User', schema: UserSchema,
  }])],
  controllers: [UserController],
  providers: [_UserService],
  exports: [_UserService],
})
export class UserModule {}
