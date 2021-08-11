import {
  Controller, Post, Body, UseFilters, UsePipes, ValidationPipe,
} from '@nestjs/common';

import {
  UserDto,
} from '../dtos/user.dto';

import {
  AuthService,
} from './auth.service';

import {
  ResultDecorator,
} from '../common/decorator/result.decorator';

import {
  HttpExceptionFilter,
} from '../common/exception/check-auth.filter';

import {
  ValidateUserFilter,
} from '../common/exception/validate-user.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService:AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  @UseFilters(new ValidateUserFilter())
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

