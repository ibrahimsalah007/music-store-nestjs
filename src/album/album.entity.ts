import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, ManyToMany, OneToMany, Repository } from 'typeorm';

import { ALBUMS, BaseEntity } from 'App/core';
import { Artist } from 'App/artist/artist.entity';
import { Song } from 'App/song/song.entity';

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

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];
}

export type AlbumRepository = Repository<Album>;
