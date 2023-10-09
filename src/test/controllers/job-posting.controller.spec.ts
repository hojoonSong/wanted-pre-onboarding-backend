import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingController } from '../../controllers/job-posting.controller';
import { JobPostingService } from '../../services/job-posting.service';

describe('JobPostingController', () => {
  let controller: JobPostingController;
  let mockService: {
    createJobPosting: jest.Mock;
    updateJobPosting: jest.Mock;
    deleteJobPosting: jest.Mock;
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
      mockService.updateJobPosting.mockResolvedValue(updatedJobPosting as any);

      const result = await controller.updateJobPosting(id, dto);

      expect(mockService.updateJobPosting).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(updatedJobPosting);
    });

    it('should update a job posting with PATCH', async () => {
      mockService.updateJobPosting.mockResolvedValue(updatedJobPosting as any);

      const result = await controller.updateJobPosting(id, dto);

      expect(mockService.updateJobPosting).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(updatedJobPosting);
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
});
