import {
  Controller, Get, Post, Put, Delete, Param, Body,
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

@Controller('users')
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
  async create(@Body() user:UserDto):Promise<number> {
    await this.UserService.create(user);

    return 1000;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() user:UpdateUserDto):Promise<number> {
    await this.UserService.update(id, user);

    return 1001;
  }

  @Delete('/:id')
  async delete(@Param('id') id:string):Promise<number> {
    await this.UserService.delete(id);

    return 1002;
  }
}
