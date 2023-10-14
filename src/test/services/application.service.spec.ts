import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from '../../services/application.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Applicant } from '../../models/applicant.entity';
import { Repository } from 'typeorm';

const mockRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

type MockedRepository<T = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('ApplicationService', () => {
  let service: ApplicationService;
  let repository: MockedRepository<Applicant>;

  beforeEach(async () => {
    repository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        {
          provide: getRepositoryToken(Applicant),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<ApplicationService>(ApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('apply', () => {
    it('should apply successfully', async () => {
      const dto = { userId: 1, jobPostingId: 2 };
      repository.findOne.mockResolvedValueOnce(null);
      repository.create.mockReturnValue(dto);
      repository.save.mockResolvedValueOnce(dto);

      expect(await service.apply(dto)).toEqual(dto);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { userId: dto.userId, jobPostingId: dto.jobPostingId },
      });
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
    });

    it('should throw an error if application already exists', async () => {
      const dto = { userId: 1, jobPostingId: 2 };
      repository.findOne.mockResolvedValueOnce(dto);

      await expect(service.apply(dto)).rejects.toThrow(
        '이미 해당 채용공고에 지원했습니다.',
      );
    });
  });
});
