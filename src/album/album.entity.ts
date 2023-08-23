import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, ManyToMany, Repository } from 'typeorm';

import { ALBUMS, BaseEntity } from 'App/core';
import { Artist } from 'App/artist/artist.entity';

@Entity({ name: ALBUMS })
export class Album extends BaseEntity {
  @ApiProperty()
  @Column({ nullable: false })
  title: string;

  @ApiProperty()
  @Column({ nullable: false })
  artworkUrl: string;

  @ManyToMany(() => Artist, (artist) => artist.albums)
  artists: Artist[];
}

export type AlbumRepository = Repository<Album>;
