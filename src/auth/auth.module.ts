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
  AuthService,
} from './auth.service';

import {
  UserSchema,
} from '../schemas/schema.user';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User', schema: UserSchema,
  }])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
