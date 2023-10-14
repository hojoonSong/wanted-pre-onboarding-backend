import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Applicant } from './applicant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Applicant, (applicant) => applicant.user)
  applications: Applicant[];
}
