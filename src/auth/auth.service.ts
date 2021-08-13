import {
  Injectable,
  HttpException,
  HttpStatus,
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
} from '../dto/user.dto';

import {
  User,
} from '../schema/schema.user';

import {
  jwtConstant,
} from '../constants';

@Injectable()
export class _AuthService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async register(user:UserDto):Promise<UserDto> {
    const NewUser = new this.UserModel(user);

    return NewUser.save();
  }

  async login(user:UserDto): Promise<string> {
    const account = await this.UserModel.findOne({
      email: user.email,
    });

    if (!account) {
      throw new HttpException('Email has not registered', HttpStatus.FORBIDDEN);
    }

    const isMatch = await account.verifyPassword(user.password);

    if (isMatch) {
      return jsonwebtoken.sign({
        id: account.id,
      }, jwtConstant.secret, {
        expiresIn: 60 * 60 * 24,
      });
    }

    throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
  }
}

