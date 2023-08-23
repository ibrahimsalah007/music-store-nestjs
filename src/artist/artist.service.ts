import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { CreateArtistDto } from './dto';
import { Artist, ArtistRepository } from './artist.entity';
import { PageOptionDto, PaginationService } from 'App/core';
import { UserService } from 'App/user/user.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: ArtistRepository,
    private readonly userService: UserService,
  ) {}

  /**
   * @description Create an artist entity and associate it with the user entity with the given id (userId)
   * @param createArtistDto  The artist entity to create
   * @param userId  The id of the user to associate the artist with
   * @returns The created artist entity
   */
  @Transactional()
  async createArtist(createArtistDto: CreateArtistDto, userId?: number) {
    const artist = this.artistRepository.create(createArtistDto);

    // Associate the artist with the user
    const user = await this.userService.findOne({ id: userId });

    artist.user = user;

    return this.artistRepository.save(artist);
  }

  /**
   * @description Find all artist entities that match the given query and return them paginated with the given page options (pageOptionDto)
   * @param query The query to use to find the artist entities to return (optional)
   * @param pageOptionDto The page options to use to return the artist entities (optional)
   * @example findAllArtists({ where: { name: 'John' } }, { skip: 0, take: 10, order: { name: 'ASC' } })
   * @returns The paginated artist entities that match the given query
   */
  async findAllArtists(query: FindManyOptions<Artist> = {}, pageOptionDto?: PageOptionDto) {
    const [artists, count] = await this.artistRepository.findAndCount({
      where: query.where,
      select: query.select,
      relations: { ...query.relations },
      skip: pageOptionDto.skip,
      take: pageOptionDto.take,
      order: pageOptionDto.order,
    });

    return PaginationService.paginate<Artist>(artists, count, pageOptionDto);
  }

  /**
   * @description Find an artist entity that matches the given query and return it
   * @example findOneArtist({ id: 1 })
   * @param query  The query to use to find the artist entity to return
   * @returns  The artist entity that matches the given query
   */
  async findOneArtist(query: FindOptionsWhere<Artist>) {
    const artist = await this.artistRepository.findOne({ where: query });

    if (!artist) throw new NotFoundException();

    return artist;
  }
}
