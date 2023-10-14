import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JobPostingService } from '../services/job-posting.service';
import {
  JobPostingDetailDto,
  JobPostingDto,
  JobPostingResponseDto,
  UpdateJobPostingDto,
} from '../DTO';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('job-postings')
@Controller('job-postings')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @Post()
  @ApiBody({ type: JobPostingDto })
  @ApiResponse({
    status: 201,
    description: '채용공고가 성공적으로 등록되었습니다.',
    type: JobPostingDto,
  })
  createJobPosting(@Body() dto: JobPostingDto) {
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

  @Get()
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({
    status: 200,
    description: '채용공고 목록을 성공적으로 가져왔습니다.',
    type: [JobPostingResponseDto],
  })
  getJobPostings(@Query('search') search?: string) {
    return this.jobPostingService.getJobPostings(search);
  }

  @Get(':id/job_posting_detail')
  @ApiResponse({
    status: 200,
    description: '채용공고의 상세 정보를 성공적으로 가져왔습니다.',
    type: JobPostingDetailDto,
  })
  async getJobPostingDetail(
    @Param('id') id: number,
  ): Promise<JobPostingDetailDto> {
    return this.jobPostingService.getJobPostingDetail(id);
  }
}
