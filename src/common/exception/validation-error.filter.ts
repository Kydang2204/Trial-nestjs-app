import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import {
  MongoError,
} from 'mongodb';
import {
  Message
} from '../../dtos/message.dto'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost):void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    let resp =new Message;

    switch (exception.code) {
      case 11000:
        resp = {
          ret_code:-1,ret_msg:'Fail',
          ext_code: 2002, ext_info: 'Duplicate Email'
        }
        response.status(status).json(resp);

        break;
      default:
        resp = {
          ret_code:-1,ret_msg:'Fail',
          ext_code: 2002, ext_info: 'An unknown error'
        }
        response.status(status).json(resp);
    }
  }
}
