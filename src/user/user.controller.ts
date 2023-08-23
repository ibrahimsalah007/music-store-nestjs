import { Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FindManyOptions } from 'typeorm';

import { CurrentUser } from './decorator';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'App/auth/guard';
import { FindOptionsBuilderPipe, PageOptionDto } from 'App/core';
import { User } from './user.entity';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async findCurrentUser(@CurrentUser() user: User) {
    return user;
  }
}
