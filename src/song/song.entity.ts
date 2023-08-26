import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, ManyToMany, ManyToOne, Repository } from 'typeorm';

import { BaseEntity, SONGS } from 'App/core';
import { Artist } from 'App/artist/artist.entity';
import { Album } from 'App/album/album.entity';

@Entity({ name: SONGS })
export class Song extends BaseEntity {
  @ApiProperty()
  @Column({ nullable: false })
  title: string;

  @ApiProperty()
  @Column({ nullable: false })
  duration: number;

  @ApiProperty()
  @ManyToMany(() => Artist, (artist) => artist.songs)
  artists: Artist[];

  @ApiProperty()
  @ManyToOne(() => Album, (album) => album.songs)
  album: Album;
}

export type SongRepository = Repository<Song>;
