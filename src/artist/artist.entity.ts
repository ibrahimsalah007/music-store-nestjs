import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, Repository } from 'typeorm';

import { ARTISTS, ARTIST_ALBUMS, ARTIST_SONGS, BaseEntity } from 'App/core';
import { User } from 'App/user/user.entity';
import { Album } from 'App/album/album.entity';
import { Song } from 'App/song/song.entity';

@Entity({ name: ARTISTS })
export class Artist extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  bio: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Album, (album) => album.artists)
  @JoinTable({
    name: ARTIST_ALBUMS,
    joinColumn: { name: 'artist_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'album_id', referencedColumnName: 'id' },
  })
  albums: Album[];

  @ManyToMany(() => Song, (song) => song.artists)
  @JoinTable({
    name: ARTIST_SONGS,
    joinColumn: { name: 'artist_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'song_id', referencedColumnName: 'id' },
  })
  songs: Song[];
}

export type ArtistRepository = Repository<Artist>;
