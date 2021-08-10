import {
  createParamDecorator, ExecutionContext,
} from '@nestjs/common';

export const ResultDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const result = {
      ret_code: 0,
      ret_msg: 'success',
      data: '',
    };
    return result;
  },
);
