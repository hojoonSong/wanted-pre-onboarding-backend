import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosting } from '../models/job-posting.entity';
import {
  JobPostingResponseDto,
  UpdateJobPostingDto,
  JobPostingDto,
} from 'src/DTO';

@Injectable()
export class JobPostingService {
  constructor(
    @InjectRepository(JobPosting)
    private jobPostingRepository: Repository<JobPosting>,
  ) {}

  async createJobPosting(dto: JobPostingDto): Promise<JobPosting> {
    const jobPosting = this.jobPostingRepository.create(dto);
    return await this.jobPostingRepository.save(jobPosting);
  }

  async updateJobPosting(
    id: number,
    dto: UpdateJobPostingDto,
  ): Promise<JobPosting> {
    await this.jobPostingRepository.update(id, dto);
    return this.jobPostingRepository.findOne({ where: { id: id } });
  }

  async deleteJobPosting(id: number): Promise<void> {
    await this.jobPostingRepository.delete(id);
  }

  async getJobPostings(search?: string): Promise<JobPostingResponseDto[]> {
    const postings = search
      ? await this.jobPostingRepository
          .createQueryBuilder('jobPosting')
          .innerJoinAndSelect('jobPosting.company', 'company')
          .where('company.name LIKE :search', { search: `%${search}%` })
          .orWhere('company.country LIKE :search', { search: `%${search}%` })
          .orWhere('company.region LIKE :search', { search: `%${search}%` })
          .orWhere('jobPosting.position LIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('jobPosting.technology LIKE :search', {
            search: `%${search}%`,
          })
          .orWhere('jobPosting.content LIKE :search', { search: `%${search}%` })
          .getMany()
      : await this.jobPostingRepository.find({ relations: ['company'] });

    return postings.map((post) => ({
      postingId: post.id,
      companyName: post.company.name,
      country: post.company.country,
      region: post.company.region,
      position: post.position,
      reward: post.reward,
      technology: post.technology,
    }));
  }
}
