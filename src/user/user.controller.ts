import {
  Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors,
} from '@nestjs/common';

import {
  UserDto,
} from '../dto/user.dto';

import {
  UpdateUserDto,
} from '../dto/update-user.dto';

import {
  _UserService,
} from './user.service';

import {
  CheckAuthInterceptor,
} from '../common/interceptor/check-auth.interceptor';

@Controller('users')
@UseInterceptors(CheckAuthInterceptor)
export class UserController {
  constructor(private readonly UserService:_UserService) {}

  @Get()
  getAll():Promise<UserDto[]> {
    return this.UserService.getAll();
  }

  @Get('/:id')
  get(@Param('id') id:string) :Promise<UserDto> {
    return this.UserService.find(id);
  }

  @Post()
  create(@Body() user:UserDto):Promise<UserDto> {
    return this.UserService.create(user);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() user:UpdateUserDto):Promise<UserDto> {
    return this.UserService.update(id, user);
  }

  @Delete('/:id')
  delete(@Param('id') id:string):string {
    this.UserService.delete(id);

    return 'Delete user successfully';
  }
}
