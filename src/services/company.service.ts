import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDto } from 'src/DTO';
import { Company } from 'src/models/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}

  async createCompany(data: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepo.create(data);
    return this.companyRepo.save(company);
  }
}
