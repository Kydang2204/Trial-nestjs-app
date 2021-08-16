import {
  Injectable,
} from '@nestjs/common';

import {
  Model,
} from 'mongoose';

import {
  InjectModel,
} from '@nestjs/mongoose';

import {
  UserDto,
} from '../dto/user.dto';

import {
  UpdateUserDto,
} from '../dto/update-user.dto';

import {
  User,
} from '../schema/schema.user';

@Injectable()
export class _UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async getAll():Promise<UserDto[]> {
    return this.UserModel.find({});
  }

  async find(id: string):Promise<UserDto> {
    return this.UserModel.findOne({
      _id: id,
    });
  }

  async create(user:UserDto):Promise<UserDto> {
    const NewUser = new this.UserModel(user);

    return NewUser.save();
  }

  async update(id:string, user:UpdateUserDto):Promise<UserDto> {
    return this.UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  async delete(id: string):Promise<UserDto> {
    return this.UserModel.findByIdAndRemove(id);
  }
}
