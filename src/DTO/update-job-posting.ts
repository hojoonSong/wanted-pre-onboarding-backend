import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobPostingDto {
  @ApiProperty()
  position?: string;

  @ApiProperty()
  reward?: number;

  @ApiProperty()
  content?: string;

  @ApiProperty()
  technology?: string;
}
