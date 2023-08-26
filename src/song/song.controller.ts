import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';

import { SongService } from './song.service';
import { CreateSongDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'App/auth/guard';
import { FindManyOptions } from 'typeorm';
import { PageOptionDto } from 'App/core';

@ApiBearerAuth()
@ApiTags('Songs')
@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createSong(@Body() createSongDto: CreateSongDto) {
    return this.songService.createSong(createSongDto);
  }

  @Get()
  findAllSongs(@Query() query: FindManyOptions, @Query() pageOptionDto: PageOptionDto) {
    return this.songService.findAllSongs(query, pageOptionDto);
  }

  @Get(':id')
  findOneSong(@Param('id') id: number) {
    return this.songService.findOneSong({ id });
  }
}
