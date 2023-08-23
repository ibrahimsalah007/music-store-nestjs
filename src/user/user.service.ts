import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import * as Bcrypt from 'bcryptjs';

import { User, UserRepository } from './user.entity';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  @Transactional()
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await Bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });

    return this.userRepository.save(user);
  }

  async findOne(query: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User | null> {
    return this.userRepository.findOne({ where: query });
  }
}
