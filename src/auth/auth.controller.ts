import {
  Controller, Post, Body,
} from '@nestjs/common';

import {
  UserDto,
} from '../dto/user.dto';

import {
  LoginUserDto,
} from '../dto/login-user.dto';

import {
  _AuthService,
} from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService:_AuthService) {}

  @Post('register')
  register(@Body() user: UserDto):Promise<UserDto> {
    return this.AuthService.register(user);
  }

  @Post('login')
  login(@Body() user:LoginUserDto):Promise<string> {
    return this.AuthService.login(user);
  }
}

