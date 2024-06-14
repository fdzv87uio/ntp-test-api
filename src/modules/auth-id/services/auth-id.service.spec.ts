import { Test, TestingModule } from '@nestjs/testing';
import { AuthIdTokenService } from './auth-id-token.service';

describe('AuthIdTokenService', () => {
  let service: AuthIdTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthIdTokenService],
    }).compile();

    service = module.get<AuthIdTokenService>(AuthIdTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
