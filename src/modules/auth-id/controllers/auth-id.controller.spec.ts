import { Test, TestingModule } from '@nestjs/testing';
import { AuthIdController } from '../../auth-id/controllers/auth-id.controller';

describe('AuthIdController', () => {
  let controller: AuthIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthIdController],
    }).compile();

    controller = module.get<AuthIdController>(AuthIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
