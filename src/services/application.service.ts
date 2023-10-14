import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Applicant } from '../models/applicant.entity';
import { CreateApplicationDto } from '../DTO/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Applicant)
    private applicantRepository: Repository<Applicant>,
  ) {}

  async apply(createApplicationDto: CreateApplicationDto): Promise<Applicant> {
    const existingApplication = await this.applicantRepository.findOne({
      where: {
        userId: createApplicationDto.userId,
        jobPostingId: createApplicationDto.jobPostingId,
      },
    });
    if (existingApplication) {
      throw new ConflictException('이미 해당 채용공고에 지원했습니다.');
    }
    const application = this.applicantRepository.create(createApplicationDto);
    return await this.applicantRepository.save(application);
  }
}
