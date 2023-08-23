import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, OneToOne, Repository } from 'typeorm';

import { ARTISTS, BaseEntity } from 'App/core';
import { User } from 'App/user/user.entity';

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
}

export type ArtistRepository = Repository<Artist>;
