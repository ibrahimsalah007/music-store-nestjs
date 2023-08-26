import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SongService } from './song.service';
import { SongController } from './song.controller';
import { Song } from './song.entity';
import { ArtistModule } from 'App/artist/artist.module';
import { AlbumModule } from 'App/album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), ArtistModule, AlbumModule],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
