import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  region: string;
}
