import { ApiProperty } from '@nestjs/swagger';

export class JobPostingDto {
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
