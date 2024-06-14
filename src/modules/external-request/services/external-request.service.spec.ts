import { Test, TestingModule } from '@nestjs/testing';
import { ExternalRequestService } from './external-request.service';

describe('ExternalRequestService', () => {
  let service: ExternalRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalRequestService],
    }).compile();

    service = module.get<ExternalRequestService>(ExternalRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
