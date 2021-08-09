import {
  Controller, Get, Post, Put, Delete, Param, Body, UseFilters,
} from '@nestjs/common';

import {
  UserDto,
} from '../dtos/user.dto';

import {
  AllExceptionsFilter,
} from '../common/exception/validation-error.filter';

import {
  Message,
} from '../dtos/message.dto';

import {
  UserService,
} from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly UserService:UserService) {}

  @Get()
  getAll():Promise<UserDto[]> {
    return this.UserService.getAll();
  }

  @Get('/:id')
  get(@Param('id') id:string) :Promise<UserDto> {
    return this.UserService.find(id);
  }

  @Post()
  @UseFilters(new AllExceptionsFilter())
  create(@Body() user:UserDto):Promise<UserDto> {
    return this.UserService.create(user);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() user:UserDto):Promise<UserDto> {
    return this.UserService.update(id, user);
  }

  @Delete('/:id')
  delete(@Param('id') id:string):Message {
    this.UserService.delete(id);

    const resq = {
      ret_code:0,ret_msg:'ok',
      ext_code: 1001, ext_info: 'Delete successfully',
    };

    return resq;
  }
}
