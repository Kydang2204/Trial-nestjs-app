import {
  Injectable,
} from '@nestjs/common';

import {
  users,
} from '../database';

import {
  UserDto, FindUserDto, CreatUserDto, UpdateUserDto,
} from './dto/user.dto';

@Injectable()
export class UserService {
  private users = users;

  getUsers():FindUserDto[] {
    return this.users;
  }

  getUserById(userId: string):FindUserDto {
    return this.users.find((user) => user.id === userId);
  }

  createUser(payload:CreatUserDto):UserDto {
    const newUser = {
      id: '04',
      ...payload,
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUser(payload:UpdateUserDto, userId:string):UserDto {
    let updatedUser: UserDto;
    const updateUserList = this.users.map((user) => {
      if (user.id === userId) {
        updatedUser = {
          id: userId,
          ...payload,
        };

        return updatedUser;
      }

      return user;
    });

    this.users = updateUserList;

    return updatedUser;
  }

  deleteUserById(userId: string):FindUserDto[] {
    const deletedUser = this.users.find((user) => user.id === userId);
    const index = users.indexOf(deletedUser);
    return this.users.splice(index, 1);
  }
}
