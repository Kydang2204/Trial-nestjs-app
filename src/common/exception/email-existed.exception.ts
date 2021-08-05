import {
  HttpException, HttpStatus,
} from '@nestjs/common';

export class EmailExistedException extends HttpException {
  constructor() {
    super('Email has registed', HttpStatus.BAD_REQUEST);
  }
}
