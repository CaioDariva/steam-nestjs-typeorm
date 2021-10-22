import { EntityRepository, Repository } from 'typeorm';
import { Game } from './game.entity';
import { CreateGameDto } from './dtos/create-games.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { FindGamesQueryDto } from './dtos/find-games.dto';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  async findGames(
    queryDto: FindGamesQueryDto,
  ): Promise<{ games: Game[]; total: number }> {
    queryDto.page = queryDto.page < 1 ? 1 : queryDto.page;
    queryDto.limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { name, company, genre } = queryDto;
    const query = this.createQueryBuilder('game');

    if (name) {
      query.andWhere('game.name ILIKE :name', { name: `%${name}%` });
    }

    if (company) {
      query.andWhere('game.company ILIKE :company', {
        company: `%${company}%`,
      });
    }

    if (genre) {
      query.andWhere('game.genre ILIKE :genre', { genre: `%${genre}%` });
    }

    query.skip((queryDto.page - 1) * queryDto.limit);
    query.take(queryDto.limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['game.name', 'game.company', 'game.genre']);

    const [games, total] = await query.getManyAndCount();

    return { games, total };
  }

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const { name, company, genre } = createGameDto;

    const game = this.create();

    game.name = name;
    game.company = company;
    game.genre = genre;

    try {
      await game.save();
      return game;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new InternalServerErrorException(
          'Erro ao salvar o jogo no banco de dados',
        );
      }
    }
  }
}
