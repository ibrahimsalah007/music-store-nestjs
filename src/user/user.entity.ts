import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Column, DeleteDateColumn, Entity, Repository, Unique } from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';

import { USERS, BaseEntity } from 'App/core';

@Entity({
  name: USERS,
})
export class User extends BaseEntity {
  @ApiProperty()
  @Unique(['username'])
  @Column({ unique: true, nullable: false })
  username: string;

  @ApiPropertyOptional()
  @Column({ unique: true, nullable: true })
  email: string;

  @ApiProperty()
  @Exclude({ toPlainOnly: true })
  @Column({ nullable: false })
  password: string;

  @ApiPropertyOptional()
  @DeleteDateColumn()
  deletedAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}

export type UserRepository = Repository<User>;
