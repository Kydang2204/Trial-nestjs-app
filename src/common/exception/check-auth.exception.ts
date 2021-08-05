import {
  HttpException, HttpStatus,
} from '@nestjs/common';

export class CheckAuthException extends HttpException {
  constructor() {
    super('You have to login first', HttpStatus.BAD_REQUEST);
  }
}
