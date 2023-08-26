import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { CreateSongDto } from './dto';
import { Song, SongRepository } from './song.entity';
import { PageOptionDto, PaginationService } from 'App/core';
import { AlbumService } from 'App/album/album.service';
import { ArtistService } from 'App/artist/artist.service';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: SongRepository,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  /**
   * @description Create an song entity
   * @param createSongDto  The song payload
   * @example createSong({ title: 'Song 1', duration: 100, artistId: 1, albumId: 1 })
   * @returns The created song entity
   */
  @Transactional()
  async createSong(createSongDto: CreateSongDto) {
    const song = this.songRepository.create(createSongDto);

    const artist = await this.artistService.findOneArtist({ id: createSongDto.artistId });
    song.artists = [artist];

    if (createSongDto.albumId) {
      const album = await this.albumService.findOneAlbum({ id: createSongDto.albumId });
      song.album = album;
    }

    return this.songRepository.save(song);
  }

  /**
   * @description Find all song entities that match the given query and return them paginated with the given page options (pageOptionDto)
   * @param query The query to use to find the song entities to return (optional)
   * @param pageOptionDto The page options to use to return the song entities (optional)
   * @example findAllSongs({ where: { name: 'John' } }, { skip: 0, take: 10, order: { name: 'ASC' } })
   * @returns The paginated song entities that match the given query
   */
  async findAllSongs(query: FindManyOptions<Song> = {}, pageOptionDto?: PageOptionDto) {
    const [songs, count] = await this.songRepository.findAndCount({
      where: query.where,
      select: query.select,
      relations: { ...query.relations, album: true, artists: true },
      skip: pageOptionDto.skip,
      take: pageOptionDto.take,
      order: pageOptionDto.order,
    });

    return PaginationService.paginate<Song>(songs, count, pageOptionDto);
  }

  /**
   * @description Find an song entity that matches the given query and return it
   * @example findOneSong({ id: 1 })
   * @param query  The query to use to find the song entity to return
   * @returns  The song entity that matches the given query
   */
  async findOneSong(query: FindOptionsWhere<Song>) {
    const song = await this.songRepository.findOne({ where: query, relations: { album: true, artists: true } });

    if (!song) throw new NotFoundException();

    return song;
  }
}
