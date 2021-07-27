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
  User,
} from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async getAll():Promise<User[]> {
    return this.UserModel.find({});
  }

  async find(id: string):Promise<User> {
    return this.UserModel.findOne({
      _id: id,
    });
  }

  async create(user:User):Promise<User> {
    const NewUser = new this.UserModel(user);

    return NewUser.save();
  }

  async update(id:string, user:User):Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  async delete(id: string):Promise<User> {
    return this.UserModel.findByIdAndRemove(id);
  }
}
