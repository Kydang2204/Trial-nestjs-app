import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

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
        ext_msg: 'Duplicate Email',
      });

      return;
    }

    response.status(status).json({
      ret_code: -1,
      ret_msg: 'fail',
      ext_msg: result.response.message ? result.response.message[0] : result.response,
    });
  }
}
