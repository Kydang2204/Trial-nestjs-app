import {
  ExceptionFilter, Catch, ArgumentsHost, HttpException,
} from '@nestjs/common';

import {
  Request, Response,
} from 'express';

import {
  Message,
} from '../../dtos/Message.dto';

@Catch(HttpException)
export class ValidateUserFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const msg = exception.getResponse();
    const msg1 = JSON.parse(JSON.stringify(msg));
    const msg2 = msg1.message;

    const resp = new Message();

    resp.ext_code = 2007;

    resp.ext_msg = msg2;

    response.status(status).json(resp);
  }
}
