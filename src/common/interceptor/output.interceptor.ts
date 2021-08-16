
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

import {
  CodeInfor,
} from '../../code-info';

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
        throw new HttpException('2000', HttpStatus.FORBIDDEN);
      }
    }

    if (req.params.id) {
      const result1 = await req.params.id.match(/^[0-9a-fA-F]{24}$/);

      if (!result1) throw new HttpException('2001', HttpStatus.BAD_REQUEST);

      const result2 = await this.UserService.find(req.params.id);

      if (!result2) throw new HttpException('2002', HttpStatus.BAD_REQUEST);
    }

    return next
      .handle()
      .pipe(map((value) => {
        if (typeof (value) === 'number') {
          return value = {
            ret_code: 0,
            ret_msg: 'success',
            code_msg: value,
            msg: Object.keys(CodeInfor).find((key) => CodeInfor[key] === value),
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
