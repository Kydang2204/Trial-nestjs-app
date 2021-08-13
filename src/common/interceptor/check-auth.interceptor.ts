
import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus,
} from '@nestjs/common';

import {
  Observable,
} from 'rxjs';

import * as jwt from 'jsonwebtoken';

import {
  jwtConstant,
} from '../../constants';

@Injectable()
export class CheckAuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    const req = context.switchToHttp().getRequest();

    try {
      jwt.verify(req.header('auth_token'), jwtConstant.secret);
    } catch {
      throw new HttpException('Auth Error', HttpStatus.FORBIDDEN);
    }

    return next
      .handle();
  }
}
