import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FindManyOptions } from 'typeorm';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto';
import { FindOptionsBuilderPipe, PageOptionDto } from 'App/core';
import { JwtAuthGuard } from 'App/auth/guard';
import { CurrentUser } from 'App/user/decorator';

@ApiBearerAuth()
@ApiTags('artists')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createArtist(@CurrentUser('id') userId: number, @Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto, userId);
  }

  @Get()
  findAllArtists(@Query(FindOptionsBuilderPipe) query: FindManyOptions, @Query() pageOptionDto: PageOptionDto) {
    return this.artistService.findAllArtists(query, pageOptionDto);
  }

  @Get(':id')
  findOneArtist(@Param('id') id: number) {
    return this.artistService.findOneArtist({ id });
  }
}
