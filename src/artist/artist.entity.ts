import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, Repository } from 'typeorm';

import { ARTISTS, ARTIST_ALBUMS, BaseEntity } from 'App/core';
import { User } from 'App/user/user.entity';
import { Album } from 'App/album/album.entity';

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
  @JoinTable({ name: ARTIST_ALBUMS })
  albums: Album[];
}

export type ArtistRepository = Repository<Artist>;
