import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import * as CodeInfo from '../../code-info.json';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost):void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const result = JSON.parse(JSON.stringify(exception));

    if (result.code === 11000) {
      response.status(status).json({
        ret_code: -1,
        ret_msg: 'fail',
        ext_code: null,
        ext_info: 'Duplicate Email',
      });

      return;
    }

    if (!result.response.message) {
      response.status(status).json({
        ret_code: -1,
        ret_msg: 'fail',
        ext_code: result.response,
        ext_info: Object.keys(CodeInfo).find((key) => CodeInfo[key] === Number(result.response)),
      });

      return;
    }

    const msg = result.response.message;

    response.status(status).json({
      ret_code: -1,
      ret_msg: 'fail',
      ext_code: null,
      ext_info: Array.isArray(msg) ? msg[0] : msg,
    });
  }
}
