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
} from '../dtos/user.dto';

import {
  User,
} from '../schemas/schema.user';

import {
  Message,
} from '../dtos/message.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async register(user:UserDto):Promise<UserDto> {
    const NewUser = new this.UserModel(user);

    return NewUser.save();
  }

  async login(user:UserDto): Promise<Message> {
    const account = await this.UserModel.findOne({
      email: user.email,
    });
    let resp:Message;

    if (!account) {
      resp = {
        code: 2000, msg: 'Email has not register',
      };

      return resp;
    }

    const isMatch = await account.verifyPassword(user.password);

    if (isMatch) {
      resp = {
        code: 1000, msg: 'Login succesfully',
      };

      return resp;
    }

    resp = {
      code: 2001, msg: 'Wrong password',
    };

    return resp;
  }
}
