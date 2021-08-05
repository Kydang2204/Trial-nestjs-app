import {
  Injectable, NestMiddleware,
} from '@nestjs/common';

import {
  Request, Response, NextFunction,
} from 'express';

import {
  AuthService,
} from 'src/auth/auth.service';

import * as jwt from 'jsonwebtoken';

import {
  CheckAuthException,
} from '../exception/check-auth.exception';

import {
  jwtConstant,
} from '../../constants';

@Injectable()
export class VerifyToken implements NestMiddleware {
  constructor(private readonly AuthService:AuthService) {}

  use(req: Request, res: Response, next: NextFunction):void {
    try {
      const result = jwt.verify(req.header('auth_token'), jwtConstant.secret);

      next();
    } catch {
      throw new CheckAuthException();
    }
  }
}
