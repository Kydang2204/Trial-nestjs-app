import {
  Controller, Post, Body, UseFilters,
} from '@nestjs/common';

import {
  UserDto,
} from '../dtos/user.dto';

import {
  AuthService,
} from './auth.service';

import {
  AllExceptionsFilter,
} from '../common/exception/validation-error.filter';

import {
  ResultDecorator,
} from '../common/decorator/result.decorator';

import {
  HttpExceptionFilter,
} from '../common/exception/check-auth.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService:AuthService) {}

  @Post('register')
  @UseFilters(new AllExceptionsFilter())
  async register(@Body() user: UserDto, @ResultDecorator() result):Promise<UserDto> {
    result.data = await this.AuthService.register(user);

    return result;
  }

  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  async login(@Body() user:UserDto, @ResultDecorator() result):Promise<UserDto> {
    result.data = await this.AuthService.login(user);

    return result;
  }
}

