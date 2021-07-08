import {
  Controller, Get, Post, Put, Delete,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  getUsers() {
    return 'All users';
  }

  @Get('/:userId')
  getUserById() {
    return 'Get one user by id';
  }

  @Post()
  createUser() {
    return 'Create user';
  }

  @Put('/:userId')
  updateUser() {
    return 'Update user';
  }

  @Delete('/:userId')
  deleteUser() {
    return 'delete user';
  }
}
