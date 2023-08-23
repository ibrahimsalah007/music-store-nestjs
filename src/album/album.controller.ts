import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AlbumService } from './album.service';

import { CreateAlbumDto } from './dto';
import { JwtAuthGuard } from 'App/auth/guard';

@ApiBearerAuth()
@ApiTags('Albums')
@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }
}
