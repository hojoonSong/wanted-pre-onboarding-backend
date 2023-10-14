import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { JobPosting } from './job-posting.entity';
import { User } from './user.entity';

@Entity()
@Unique(['userId', 'jobPostingId'])
export class Applicant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => JobPosting, (jobPosting) => jobPosting.applicants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'jobPostingId' })
  jobPosting: JobPosting;

  @Column()
  jobPostingId: number;

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: 'userId' })
  user: User;
}
