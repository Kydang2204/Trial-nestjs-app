import {
  Injectable,
} from '@nestjs/common';

@Injectable()
export class _AppService {
  getHello():string {
    return 'Welcome to my nestjs app';
  }
}
