import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { JobPostingService } from '../services/job-posting.service';
import { CreateJobPostingDto, UpdateJobPostingDto } from '../DTO';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('job-postings')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @Post()
  @ApiBody({ type: CreateJobPostingDto })
  @ApiResponse({
    status: 201,
    description: '채용공고가 성공적으로 등록되었습니다.',
    type: CreateJobPostingDto,
  })
  createJobPosting(@Body() dto: CreateJobPostingDto) {
    return this.jobPostingService.createJobPosting(dto);
  }

  @Put(':id')
  @Patch(':id')
  @ApiBody({ type: UpdateJobPostingDto })
  @ApiResponse({
    status: 200,
    description: '채용공고가 성공적으로 업데이트되었습니다.',
    type: UpdateJobPostingDto,
  })
  updateJobPosting(@Param('id') id: number, @Body() dto: UpdateJobPostingDto) {
    return this.jobPostingService.updateJobPosting(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: '채용공고가 성공적으로 삭제되었습니다.',
  })
  deleteJobPosting(@Param('id') id: number) {
    return this.jobPostingService.deleteJobPosting(id);
  }
}
