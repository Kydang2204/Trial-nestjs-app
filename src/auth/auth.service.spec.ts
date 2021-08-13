import {
  Test, TestingModule,
} from '@nestjs/testing';

import {
  _AuthService,
} from './auth.service';

describe('AuthService', () => {
  let service: _AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [_AuthService],
    }).compile();

    service = module.get<_AuthService>(_AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
