import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  jobPostingId: number;
}
