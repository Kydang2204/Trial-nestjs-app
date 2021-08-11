import {
  Controller, Get, Post, Put, Delete, Param, Body, UseFilters,UsePipes,ValidationPipe
} from '@nestjs/common';

import {
  ResultDecorator,
} from 'src/common/decorator/result.decorator';

import {
  UserDto
} from '../dtos/user.dto';

import {
  ValidateUserFilter,
} from '../common/exception/validate-user.filter';

import {
  UserService,
} from './user.service';
@Controller('users')
export class UserController {
  constructor(private readonly UserService:UserService) {}

  @Get()
  async getAll(@ResultDecorator() result):Promise<UserDto> {
    result.data = await this.UserService.getAll();

    return result;
  }

  @Get('/:id')
  async get(@Param('id') id:string, @ResultDecorator() result) :Promise<UserDto> {
    result.data = await this.UserService.find(id);

    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseFilters(new ValidateUserFilter())
  async create(@Body() user:UserDto, @ResultDecorator() result):Promise<UserDto> {
    result.data = await this.UserService.create(user);

    return result;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() user:UserDto, @ResultDecorator() result):Promise<UserDto> {
    result.data = await this.UserService.update(id, user);

    return result;
  }

  @Delete('/:id')
  async delete(@Param('id') id:string, @ResultDecorator() result):Promise<UserDto> {
    await this.UserService.delete(id);

    result.data = 'Delete user successfully';

    return result;
  }
}
