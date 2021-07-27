import {
  Controller, Get, Post, Put, Delete, Param, Body,
} from '@nestjs/common';

import {
  User,
} from '../dtos/user.dto';

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
  getAll():Promise<User[]> {
    return this.UserService.getAll();
  }

  @Get('/:id')
  get(@Param('id') id:string) :Promise<User> {
    return this.UserService.find(id);
  }

  @Post()
  create(@Body() user:User):Promise<User> {
    return this.UserService.create(user);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() user:User):Promise<User> {
    return this.UserService.update(id, user);
  }

  @Delete('/:id')
  delete(@Param('id') id:string):Message {
    this.UserService.delete(id);

    const resq = {
      code: 1001, msg: 'Delete successfull',
    };

    return resq;
  }
}
