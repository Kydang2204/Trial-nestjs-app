import {
  Controller, Post, Body,
} from '@nestjs/common';

import {
  UserDto,
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
  register(@Body() user: UserDto):Promise<UserDto> {
    return this.AuthService.register(user);
  }

  @Post('login')
  login(@Body() user:UserDto):Promise<Message> {
    return this.AuthService.login(user);
  }
}

