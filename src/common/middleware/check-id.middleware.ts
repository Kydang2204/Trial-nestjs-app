import {
  Injectable, NestMiddleware,
} from '@nestjs/common';

import {
  Request, Response, NextFunction,
} from 'express';

import {
  Message,
} from 'src/dtos/Message.dto';

import {
  UserService,
} from '../../user/user.service';

@Injectable()
export class CheckIdMiddleware implements NestMiddleware {
  constructor(private readonly UserService:UserService) {}

  use(req: Request, res: Response, next: NextFunction):Promise<void> {
    return (async () => {
      const output = new Message();

      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        output.ext_code = 2005;

        output.ext_msg = 'Wrong Format Id';

        res.json(output);

        return;
      }

      const result = await this.UserService.find(req.params.id);

      if (!result) {
        output.ext_code = 2006;

        output.ext_msg = 'Sorry . Not found this Id';

        res.json(output);

        return;
      }

      next();
    })();
  }
}
