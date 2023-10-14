import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from '../../controllers/application.controller';
import { ApplicationService } from '../../services/application.service';

interface MockApplicationService {
  apply: jest.Mock;
}

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let service: MockApplicationService;

  beforeEach(async () => {
    service = { apply: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [
        {
          provide: ApplicationService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('apply', () => {
    it('should apply successfully', async () => {
      const dto = { userId: 1, jobPostingId: 2 };
      service.apply.mockResolvedValueOnce(dto);
      expect(await controller.apply(dto)).toEqual(dto);
      expect(service.apply).toHaveBeenCalledWith(dto);
    });

    it('should throw an error if application fails', async () => {
      const dto = { userId: 1, jobPostingId: 2 };
      service.apply.mockRejectedValueOnce(new Error('Error'));
      await expect(controller.apply(dto)).rejects.toThrow('Error');
    });
  });
});
