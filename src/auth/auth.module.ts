import {
  Global,
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

@Global()
@Module({
  imports: [MongooseModule.forFeature([{
    name: 'User', schema: UserSchema,
  }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
