import {
  Controller, Get, Post, Put, Delete, Param, Body,
} from '@nestjs/common';

import {
  FindUserDto, UserDto, CreatUserDto,
} from './dto/user.dto';

import {
  UserService,
} from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly UserService:UserService) {}

  @Get()
  getUsers():FindUserDto[] {
    return this.UserService.getUsers();
  }

  @Get('/:userId')
  getUserById(@Param('userId') userId : string):FindUserDto {
    return this.UserService.getUserById(userId);
  }

  @Post()
  createUser(@Body() body:CreatUserDto):UserDto {
    return this.UserService.createUser(body);
  }

  @Put('/:userId')
  updateUser(@Param('userId') userId: string, @Body() body:FindUserDto):UserDto {
    return this.UserService.updateUser(body, userId);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId:string):string {
    this.UserService.deleteUserById(userId);

    return `delete suscessfully user with id ${userId}`;
  }
}
