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
  Message,
} from '../../dtos/Message.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost):void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const resp = new Message();

    switch (exception.code) {
      case 11000:

        resp.ext_code = 2000;

        resp.ext_msg = 'Duplicate Email';

        response.status(status).json(resp);

        break;
      default:
        resp.ext_code = 2000;

        resp.ext_msg = 'An unknown error';

        response.status(status).json(resp);
    }
  }
}
