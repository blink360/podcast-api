import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateEpisodeDto } from 'src/episodes/dto/create-episode.dto';
import { Episode } from './entity/Episode';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  async findAll(sort: 'asc' | 'desc' = 'asc', limit: number) {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc).slice(0,limit)
      : this.episodes.sort(sortDesc).slice(0,limit);
  }

  async findFeatured() {
    const featured = this.episodes.filter((episode) => episode.featured);

    if (!featured) {
      return new NotFoundException('No Featured episode');
    }

    return featured;
  }

  async findOne(id: string) {
    const episode = this.episodes.find((episode) => episode.id === id);

    if (!episode) {
      throw new NotFoundException('No Episode found!');
    }

    return episode;
  }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);

    return newEpisode;
  }
}
