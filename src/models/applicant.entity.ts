import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { JobPosting } from './job-posting.entity';
import { User } from './user.entity';

@Entity()
@Unique(['userId', 'jobPosting'])
export class Applicant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => JobPosting, (jobPosting) => jobPosting.applicants, {
    onDelete: 'CASCADE',
  })
  jobPosting: JobPosting;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;
}
