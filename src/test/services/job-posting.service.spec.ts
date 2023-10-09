import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingService } from '../../services/job-posting.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobPosting } from '../../models/job-posting.entity';

describe('JobPostingService', () => {
  let service: JobPostingService;
  let mockRepository: Partial<jest.Mocked<Repository<JobPosting>>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((jobPosting) => Promise.resolve(jobPosting)),
      update: jest.fn().mockImplementation((_, dto) => Promise.resolve()),
      findOne: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue({ affected: 1, raw: [] }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobPostingService,
        {
          provide: getRepositoryToken(JobPosting),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<JobPostingService>(JobPostingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createJobPosting', () => {
    it('should create a job posting', async () => {
      const dto = {
        title: 'Software Engineer',
        description: 'A software job',
        companyId: 1,
        position: 'Engineer',
        reward: 50000,
        content: 'Job details here',
        technology: 'TypeScript, NestJS',
      };

      const jobPosting = new JobPosting();
      Object.assign(jobPosting, dto);

      mockRepository.create.mockReturnValue(jobPosting);
      mockRepository.save.mockResolvedValue(jobPosting);

      const result = await service.createJobPosting(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(jobPosting);
      expect(result).toEqual(jobPosting);
    });
  });

  describe('updateJobPosting', () => {
    it('should update a job posting', async () => {
      const id = 1;
      const dto = {
        position: 'Updated Position',
        reward: 60000,
        content: 'Updated job details',
        technology: 'Updated Tech Stack',
      };
      const existingJobPosting = new JobPosting();
      const updatedJobPosting = Object.assign(
        new JobPosting(),
        existingJobPosting,
        dto,
      );

      mockRepository.findOne.mockResolvedValueOnce(updatedJobPosting);

      const result = await service.updateJobPosting(id, dto);

      expect(mockRepository.update).toHaveBeenCalledWith(id, dto);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: id },
      });
      expect(result).toEqual(updatedJobPosting);
    });
  });

  describe('deleteJobPosting', () => {
    it('should delete a job posting', async () => {
      const id = 1;

      mockRepository.delete.mockResolvedValueOnce({ affected: 1, raw: [] });

      await service.deleteJobPosting(id);

      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
