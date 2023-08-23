import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  bio: string;
}
