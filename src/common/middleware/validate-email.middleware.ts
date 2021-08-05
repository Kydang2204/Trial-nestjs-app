import {
  Injectable, NestMiddleware, BadRequestException,
} from '@nestjs/common';

import {
  Request, Response, NextFunction,
} from 'express';

import {
  AuthService,
} from 'src/auth/auth.service';

import {
  EmailExistedException,
} from '../exception/email-existed.exception';

@Injectable()
export class ValidateEmailMiddleware implements NestMiddleware {
  constructor(private readonly AuthService:AuthService) {}

  use(req: Request, res: Response, next: NextFunction):Promise<void> {
    return (async () => {
      const result = await this.AuthService.validateEmail(req.body.email);
      if (result) throw new EmailExistedException();

      next();
    })();
  }
}
