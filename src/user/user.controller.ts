import {
  Controller, Get, Post, Put, Delete, Param, Body,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getUsers() {
    return 'All users';
  }

  @Get('/:userId')
  getUserById(@Param('userId') userId : string) {
    return `Get one user by id ${userId}`;
  }

  @Post()
  createUser(@Body() body) {
    return `Create user with data ${JSON.stringify(body)}`;
  }

  @Put('/:userId')
  updateUser(@Param('userId') userId: string, @Body() body) {
    return `Update user with id ${userId} with data ${JSON.stringify(body)}`;
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId:string) {
    return `delete suscessfully user with id ${userId}`;
  }
}
