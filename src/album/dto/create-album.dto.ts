import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsString } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  title: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  artworkUrl: string;
}
