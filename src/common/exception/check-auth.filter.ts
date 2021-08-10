import {
  ExceptionFilter, Catch, ArgumentsHost, HttpException,
} from '@nestjs/common';

import {
  Response,
} from 'express';

import {
  Message,
} from '../../dtos/Message.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost):void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const resp = new Message();

    resp.ext_code = 2001;

    resp.ext_msg = 'Auth Error';

    response.status(status).json(resp);
  }
}
