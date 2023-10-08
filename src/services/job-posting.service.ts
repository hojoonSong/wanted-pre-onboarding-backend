// src/services/job-posting.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPosting } from '../models/job-posting.entity';
import { CreateJobPostingDto } from '../DTO/create-job-posting.dto';

@Injectable()
export class JobPostingService {
  constructor(
    @InjectRepository(JobPosting)
    private jobPostingRepository: Repository<JobPosting>,
  ) {}

  async createJobPosting(dto: CreateJobPostingDto): Promise<JobPosting> {
    const jobPosting = this.jobPostingRepository.create(dto);
    return await this.jobPostingRepository.save(jobPosting);
  }
}
