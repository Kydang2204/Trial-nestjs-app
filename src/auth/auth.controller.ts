import {
  Controller, Post, Body,
} from '@nestjs/common';

import {
  User,
} from '../dtos/user.dto';

import {
  Message,
} from '../dtos/message.dto';

import {
  AuthService,
} from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService:AuthService) {}

  @Post('register')
  register(@Body() user: User):Promise<User> {
    return this.AuthService.register(user);
  }

  @Post('login')
  login(@Body() user:User):Promise<Message> {
    return this.AuthService.login(user);
  }
}

