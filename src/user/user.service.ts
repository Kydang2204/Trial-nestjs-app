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
  Response,
} from 'express';

import {
  UserDto,
} from '../dtos/user.dto';

import {
  User,
} from '../schemas/schema.user';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async getAll():Promise<UserDto[]> {
    return this.UserModel.find({});
  }

  async find(id: string):Promise<UserDto> {
    return this.UserModel.findOne({
      _id: id,
    });
  }

  async create(user:UserDto, res?:Response):Promise<UserDto> {
    const NewUser = new this.UserModel(user);
    return NewUser.save();
  }

  async update(id:string, user:UserDto):Promise<UserDto> {
    return this.UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  async delete(id: string):Promise<UserDto> {
    return this.UserModel.findByIdAndRemove(id);
  }
}
