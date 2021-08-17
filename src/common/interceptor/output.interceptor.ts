
import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus,
} from '@nestjs/common';

import {
  Observable,
} from 'rxjs';

import {
  map,
} from 'rxjs/operators';

import * as jwt from 'jsonwebtoken';

import {
  _UserService,
} from '../../user/user.service';

import {
  jwtConstant,
} from '../../constants';

import * as CodeInfo from '../../code-info.json';

import * as ResponseCodes from '../../code-response.json';

@Injectable()
export class OutputInterceptor implements NestInterceptor {
  constructor(private readonly UserService:_UserService) {}

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    if (req.url.slice(0, 7) === '/users/') {
      try {
        jwt.verify(req.header('auth_token'), jwtConstant.secret);
      } catch {
        throw new HttpException(String(ResponseCodes.auth_error), HttpStatus.FORBIDDEN);
      }
    }

    if (req.params.id) {
      const result1 = await req.params.id.match(/^[0-9a-fA-F]{24}$/);

      if (!result1) throw new HttpException(String(ResponseCodes.id_format_error), HttpStatus.BAD_REQUEST);

      const result2 = await this.UserService.find(req.params.id);

      if (!result2) throw new HttpException(String(ResponseCodes.id_not_found_error), HttpStatus.BAD_REQUEST);
    }

    return next
      .handle()
      .pipe(map((value) => {
        if (typeof (value) === 'number') {
          return value = {
            ret_code: 0,
            ret_msg: 'success',
            code_msg: value,
            msg: Object.keys(CodeInfo).find((key) => CodeInfo[key] === value),
          };
        }

        return value = {
          ret_code: 0,
          ret_msg: 'success',
          code_msg: null,
          data: value,
        };
      }));
  }
}
