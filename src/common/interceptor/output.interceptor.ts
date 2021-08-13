
import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus,
} from '@nestjs/common';

import {
  Observable,
} from 'rxjs';

import {
  map,
} from 'rxjs/operators';

import {
  _UserService,
} from '../../user/user.service';

@Injectable()
export class OutputInterceptor implements NestInterceptor {
  constructor(private readonly UserService:_UserService) {}

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    if (req.params.id) {
      const result1 = await req.params.id.match(/^[0-9a-fA-F]{24}$/);

      if (!result1) throw new HttpException('Wrong id format', HttpStatus.BAD_REQUEST);

      const result2 = await this.UserService.find(req.params.id);

      if (!result2) throw new HttpException('Not found user with this id', HttpStatus.BAD_REQUEST);
    }

    return next
      .handle()
      .pipe(map((value) => (value = {
        ret_code: 0,
        ret_msg: 'success',
        data: value,
      }
      )));
  }
}
