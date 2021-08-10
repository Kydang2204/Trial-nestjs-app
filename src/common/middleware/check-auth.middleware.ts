import {
  Injectable, NestMiddleware, HttpException, HttpStatus,
} from '@nestjs/common';

import {
  Request, Response, NextFunction,
} from 'express';

import * as jwt from 'jsonwebtoken';

import {
  Message,
} from 'src/dtos/Message.dto';

import {
  jwtConstant,
} from '../../constants';

@Injectable()
export class CheckAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction):void {
    try {
      const result = jwt.verify(req.header('auth_token'), jwtConstant.secret);

      next();
    } catch {
      const result = new Message();

      result.ext_code = 2004;

      result.ext_msg = 'You have to login first';

      res.json(result);
    }
  }
}
