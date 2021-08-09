import {
  Injectable, UseFilters,
} from '@nestjs/common';

import {
  Model,
} from 'mongoose';

import {
  InjectModel,
} from '@nestjs/mongoose';

import * as jsonwebtoken from 'jsonwebtoken';

import {
  UserDto,
} from '../dtos/user.dto';

import {
  User,
} from '../schemas/schema.user';

import {
  Message,
} from '../dtos/message.dto';

import {
  jwtConstant,
} from '../constants';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async checkEmailDuplicate(email:string):Promise<UserDto> {
    const findUser : null | UserDto = await this.UserModel.findOne({
      email,
    });
    return findUser;
  }

  async register(user:UserDto):Promise<UserDto> {
    const NewUser = new this.UserModel(user);
    return NewUser.save();
  }

  async login(user:UserDto): Promise<Message> {
    const account = await this.UserModel.findOne({
      email: user.email,
    });
    let resp = new Message();

    if (!account) {
      resp = {
        ret_code:-1,ret_msg:'Fail',
        ext_code: 2000, ext_info: 'Email has not register',
      };

      return resp;
    }

    const isMatch = await account.verifyPassword(user.password);

    if (isMatch) {
      resp = {
      ret_code:0, ret_msg:'Ok',
      ext_code: 1000, 
      ext_info: jsonwebtoken.sign({ id: account.id}, jwtConstant.secret,{expiresIn: 60 * 60 * 24,})
      }
      return resp;
    }

    resp = {
      ret_code:-1,ret_msg:'Fail',
      ext_code: 2000, ext_info: 'Wrong password',
    }
    return resp;
  }}
