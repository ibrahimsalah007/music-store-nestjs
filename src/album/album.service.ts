import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Transactional } from 'typeorm-transactional';

import { CreateAlbumDto } from './dto';
import { Album, AlbumRepository } from './album.entity';
import { FindOptionsWhere } from 'typeorm';

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

  /**
   * @description Create Album entity
   * @param createAlbumDto  The album payload to create
   * @returns The created album entity
   */
  @Transactional()
  async findOneAlbum(query: FindOptionsWhere<Album>) {
    const album = await this.albumRepository.findOne({ where: query });

    if (!album) throw new NotFoundException();

    return album;
  }
}
