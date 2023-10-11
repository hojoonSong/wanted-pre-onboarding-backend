import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from 'src/DTO';
import { CompanyService } from 'src/services/company.service';
import { UserService } from 'src/services/user.service';

@ApiTags('sample')
@Controller('sample')
export class SampleController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  @Post('company')
  @ApiBody({ type: CreateCompanyDto })
  async createCompany(@Body() data: CreateCompanyDto) {
    const company = await this.companyService.createCompany(data);
    return company;
  }

  @Post('user')
  async createUser() {
    const user = await this.userService.createUser();
    return { id: user.id };
  }
}
