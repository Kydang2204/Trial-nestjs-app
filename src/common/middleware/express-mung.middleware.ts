import {
    Body,
    Injectable, NestMiddleware,
  } from '@nestjs/common';
  
import {
    Request, Response, NextFunction,
  } from 'express';
 import  * as mung from 'express-mung'
  
  @Injectable()
  export class ExpressMungMiddleware implements NestMiddleware {
   use(req: Request, res: Response, next: NextFunction):void {
        mung.json((body) => {
            console.log('abc')
            return {body:body,abc:'ajajaj'};
        }
);
    }
  }
  