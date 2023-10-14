import { ApiProperty } from '@nestjs/swagger';

export class JobPostingDetailDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  region: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  reward: number;

  @ApiProperty()
  technology: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ required: false })
  otherJobPostings?: number[];
}
