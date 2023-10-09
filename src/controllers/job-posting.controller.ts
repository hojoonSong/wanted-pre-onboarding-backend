import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { JobPostingService } from '../services/job-posting.service';
import { CreateJobPostingDto, UpdateJobPostingDto } from '../DTO';
import { ApiBody } from '@nestjs/swagger';

@Controller('job-postings')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @Post()
  @ApiBody({ type: CreateJobPostingDto })
  createJobPosting(@Body() dto: CreateJobPostingDto) {
    return this.jobPostingService.createJobPosting(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateJobPostingDto })
  updateJobPosting(@Param('id') id: number, @Body() dto: UpdateJobPostingDto) {
    return this.jobPostingService.updateJobPosting(id, dto);
  }
}
