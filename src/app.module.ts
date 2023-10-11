import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobPostingService } from './services/job-posting.service';
import { JobPostingController } from './controllers/job-posting.controller';
import { Applicant } from './models/applicant.entity';
import { Company } from './models/company.entity';
import { JobPosting } from './models/job-posting.entity';
import { User } from './models/user.entity';
import { CompanyService } from './services/company.service';
import { UserService } from './services/user.service';
import { SampleController } from './controllers/sample.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [Applicant, Company, JobPosting, User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Applicant, Company, JobPosting, User]),
  ],
  controllers: [JobPostingController, SampleController],
  providers: [JobPostingService, CompanyService, UserService],
})
export class AppModule {}
