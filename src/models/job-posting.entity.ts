import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Applicant } from './applicant.entity';

@Entity()
export class JobPosting {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.jobPostings)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: number;

  @Column({ length: 255 })
  position: string;

  @Column()
  reward: number;

  @Column('text')
  content: string;

  @Column({ length: 255 })
  technology: string;

  @OneToMany(() => Applicant, (applicant) => applicant.jobPosting)
  applicants: Applicant[];
}
