import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Transactional } from 'typeorm-transactional';

import { CreateAlbumDto } from './dto';
import { Album, AlbumRepository } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: AlbumRepository,
  ) {}

  /**
   * @description Create Album entity
   * @param createAlbumDto  The album payload to create
   * @returns The created album entity
   */
  @Transactional()
  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);

    return this.albumRepository.save(album);
  }
}
