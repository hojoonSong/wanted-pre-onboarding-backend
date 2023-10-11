import { ApiProperty } from '@nestjs/swagger';

export class JobPostingResponseDto {
  @ApiProperty()
  postingId: number;

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
}
