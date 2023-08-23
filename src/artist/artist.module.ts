import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { Artist } from './artist.entity';
import { UserModule } from 'App/user/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), UserModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
