import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateAlbumDto } from './dto';
import { Transactional } from 'typeorm-transactional';
import { Album, AlbumRepository } from './album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { PageOptionDto, PaginationService } from 'App/core';

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
