import { ApiProperty } from '@nestjs/swagger';

export class CreateJobPostingDto {
  @ApiProperty()
  companyId: number;

  @ApiProperty()
  position: string;

  @ApiProperty()
  reward: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  technology: string;
}