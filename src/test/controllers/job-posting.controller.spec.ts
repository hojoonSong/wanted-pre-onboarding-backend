import { UpdateJobPostingDto } from 'src/DTO';
import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingController } from '../../controllers/job-posting.controller';
import { JobPostingService } from '../../services/job-posting.service';

describe('JobPostingController', () => {
  let controller: JobPostingController;
  let mockService: {
    createJobPosting: jest.Mock;
    updateJobPosting: jest.Mock;
    deleteJobPosting: jest.Mock;
    getJobPostings: jest.Mock;
    getJobPostingDetail: jest.Mock;
    jobPostingRepository: {
      findOne: jest.Mock;
      save: jest.Mock;
      create: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    mockService = {
      createJobPosting: jest.fn(),
      updateJobPosting: jest.fn(),
      deleteJobPosting: jest.fn(),
      getJobPostings: jest.fn(),
      getJobPostingDetail: jest.fn(),
      jobPostingRepository: {
        findOne: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobPostingController],
      providers: [
        {
          provide: JobPostingService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<JobPostingController>(JobPostingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      mockService.createJobPosting.mockResolvedValue(dto as any);

      const result = await controller.createJobPosting(dto);

      expect(mockService.createJobPosting).toHaveBeenCalledWith(dto);
      expect(result).toEqual(dto);
    });
  });

  describe('updateJobPosting', () => {
    const id = 1;
    const dto = {
      position: 'Updated Position',
      reward: 60000,
      content: 'Updated job details',
      technology: 'Updated Tech Stack',
    };
    const updatedJobPosting = { ...dto, id };

    it('should update a job posting with PUT', async () => {
      mockService.updateJobPosting.mockResolvedValue(updatedJobPosting);

      const result = await controller.updateJobPosting(id, dto);

      expect(mockService.updateJobPosting).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(updatedJobPosting);
    });
  });

  describe('patchJobPosting', () => {
    const id = 1;
    const dto = {
      position: 'Updated Position',
      reward: 60000,
    };
    const patchedJobPosting = { ...dto, id };

    it('should patch a job posting with PATCH', async () => {
      mockService.updateJobPosting.mockResolvedValue(patchedJobPosting);

      const result = await controller.patchJobPosting(id, dto);

      expect(mockService.updateJobPosting).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(patchedJobPosting);
    });
  });

  describe('deleteJobPosting', () => {
    it('should delete a job posting', async () => {
      const id = 1;
      mockService.deleteJobPosting.mockResolvedValue(null);

      await controller.deleteJobPosting(id);

      expect(mockService.deleteJobPosting).toHaveBeenCalledWith(id);
    });
  });

  describe('getJobPostings', () => {
    it('should retrieve job postings', async () => {
      const jobPostings = [
        {
          title: 'Software Engineer',
          description: 'A software job',
          companyId: 1,
          position: 'Engineer',
          reward: 50000,
          content: 'Job details here',
          technology: 'TypeScript, NestJS',
        },
      ];
      mockService.getJobPostings = jest
        .fn()
        .mockResolvedValue(jobPostings as any);

      const result = await controller.getJobPostings();

      expect(mockService.getJobPostings).toHaveBeenCalled();
      expect(result).toEqual(jobPostings);
    });

    it('should retrieve job postings with search query', async () => {
      const jobPostings = [
        {
          title: 'Software Engineer',
          description: 'A software job',
          companyId: 1,
          position: 'Engineer',
          reward: 50000,
          content: 'Job details here',
          technology: 'TypeScript, NestJS',
        },
      ];
      const searchQuery = 'Software';
      mockService.getJobPostings = jest
        .fn()
        .mockResolvedValue(jobPostings as any);

      const result = await controller.getJobPostings(searchQuery);

      expect(mockService.getJobPostings).toHaveBeenCalledWith(searchQuery);
      expect(result).toEqual(jobPostings);
    });
  });

  describe('getJobPostingDetail', () => {
    it('should retrieve job posting detail', async () => {
      const id = 1;
      const jobPostingDetail = {
        id,
        title: 'Software Engineer',
        description: 'A software job',
        companyId: 1,
        position: 'Engineer',
        reward: 50000,
        content: 'Job details here',
        technology: 'TypeScript, NestJS',
      };
      mockService.getJobPostingDetail = jest
        .fn()
        .mockResolvedValue(jobPostingDetail as any);

      const result = await controller.getJobPostingDetail(id);

      expect(mockService.getJobPostingDetail).toHaveBeenCalledWith(id);
      expect(result).toEqual(jobPostingDetail);
    });

    it('should throw an error if job posting is not found', async () => {
      const id = 1;
      mockService.getJobPostingDetail = jest.fn().mockResolvedValue(null);

      await expect(controller.getJobPostingDetail(id)).rejects.toThrow();

      expect(mockService.getJobPostingDetail).toHaveBeenCalledWith(id);
    });
  });
});
