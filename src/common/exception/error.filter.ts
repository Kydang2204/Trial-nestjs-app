import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import {
  CodeInfor,
} from '../../code-info';

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
        ext_info: Object.keys(CodeInfor).find((key) => CodeInfor[key] === Number(result.response)),
      });
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
