import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApplicationService } from '../services/application.service';
import { CreateApplicationDto } from '../DTO/create-application.dto';
import { ApiBody, ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiBody({ type: CreateApplicationDto })
  @ApiResponse({
    status: 201,
    description: '채용공고에 성공적으로 지원했습니다.',
    type: CreateApplicationDto,
  })
  @ApiResponse({
    status: 409,
    description: '충돌: 사용자가 이미 이 채용공고에 지원했습니다.',
  })
  async apply(@Body() createApplicationDto: CreateApplicationDto) {
    try {
      return await this.applicationService.apply(createApplicationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}
