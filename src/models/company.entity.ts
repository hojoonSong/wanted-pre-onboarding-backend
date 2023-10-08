import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { JobPosting } from './job-posting.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  country: string;

  @Column({ length: 255 })
  region: string;

  @OneToMany(() => JobPosting, jobPosting => jobPosting.company)
  jobPostings: JobPosting[];
}
