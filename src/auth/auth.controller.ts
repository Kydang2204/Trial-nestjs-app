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
  async register(@Body() user: UserDto):Promise<number> {
    await this.AuthService.register(user);

    return 1003;
  }

  @Post('login')
  login(@Body() user:LoginUserDto):Promise<string> {
    return this.AuthService.login(user);
  }
}

