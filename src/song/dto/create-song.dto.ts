import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSongDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  title: string;

  @ApiProperty()
  @IsInt()
  @IsDefined()
  duration: number;

  @ApiProperty()
  @IsInt()
  @IsDefined()
  artistId: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  albumId: number;
}
