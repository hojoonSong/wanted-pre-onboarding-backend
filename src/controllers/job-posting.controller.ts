import { Body, Controller, Post } from '@nestjs/common';
import { JobPostingService } from '../services/job-posting.service';
import { CreateJobPostingDto } from '../DTO/create-job-posting.dto';
import { ApiBody } from '@nestjs/swagger';


@Controller('job-postings')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @Post()
  @ApiBody({ type: CreateJobPostingDto })
  createJobPosting(@Body() dto: CreateJobPostingDto) {
    return this.jobPostingService.createJobPosting(dto);
  }
}