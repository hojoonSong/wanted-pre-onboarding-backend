import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingService } from '../../services/job-posting.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobPosting } from '../../models/job-posting.entity';

describe('JobPostingService', () => {
  let service: JobPostingService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((jobPosting) => Promise.resolve(jobPosting)),
      update: jest.fn().mockResolvedValue({}),
      findOne: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue({ affected: 1, raw: [] }),
      find: jest.fn().mockResolvedValue([]),
      createQueryBuilder: jest.fn(() => ({
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      })),
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

  describe('getJobPostings', () => {
    it('should retrieve job postings with optional search parameter', async () => {
      const search = 'Engineer';
      const postings = [
        {
          id: 1,
          company: { name: 'ABC Corp', country: 'USA', region: 'West' },
          position: 'Engineer',
          reward: 50000,
          technology: 'TypeScript, NestJS',
        },
      ];
      const expectedDto = postings.map((post) => ({
        id: post.id,
        companyName: post.company.name,
        country: post.company.country,
        region: post.company.region,
        position: post.position,
        reward: post.reward,
        technology: post.technology,
      }));

      const queryBuilderMock = {
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(postings),
      };
      mockRepository.createQueryBuilder.mockReturnValue(queryBuilderMock);

      const result = await service.getJobPostings(search);

      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
      expect(queryBuilderMock.innerJoinAndSelect).toHaveBeenCalledWith(
        'jobPosting.company',
        'company',
      );
      expect(queryBuilderMock.where).toHaveBeenCalled();
      expect(queryBuilderMock.orWhere).toHaveBeenCalled();
      expect(queryBuilderMock.getMany).toHaveBeenCalled();

      expect(result).toEqual(expectedDto);
    });
  });

  describe('getJobPostingDetail', () => {
    it('should retrieve the detailed information of a job posting by id', async () => {
      const id = 1;

      const posting = {
        id: 1,
        company: { name: 'ABC Corp', country: 'USA', region: 'West' },
        position: 'Engineer',
        reward: 50000,
        technology: 'TypeScript, NestJS',
        content: 'Details about the position',
        companyId: 1,
      } as JobPosting;

      const otherPostings = [
        {
          id: 2,
          company: { name: 'ABC Corp', country: 'USA', region: 'West' },
          position: 'Engineer',
          reward: 50000,
          technology: 'TypeScript, NestJS',
          content: 'Details about the position',
          companyId: 1,
        },
      ] as JobPosting[];

      const expectedDetailDto = {
        id: posting.id,
        companyName: posting.company.name,
        country: posting.company.country,
        region: posting.company.region,
        position: posting.position,
        reward: posting.reward,
        technology: posting.technology,
        content: posting.content,
        otherJobPostings: otherPostings.map((p) => p.id),
      };

      mockRepository.findOne.mockResolvedValueOnce(posting);
      mockRepository.find.mockResolvedValueOnce(otherPostings);

      const result = await service.getJobPostingDetail(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['company'],
      });
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { company: posting.company },
      });
      expect(result).toEqual(expectedDetailDto);
    });
  });
});
