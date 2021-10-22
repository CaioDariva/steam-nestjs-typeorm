import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameRepository } from './games.repository';
import { CreateGameDto } from './dtos/create-games.dto';
import { Game } from './game.entity';
import { UpdateGameDto } from './dtos/update-games.dto';
import { FindGamesQueryDto } from './dtos/find-games.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameRepository)
    private gameRepository: GameRepository,
  ) {}

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.gameRepository.createGame(createGameDto);
  }

  async findGameById(gameId: string): Promise<Game> {
    const game = await this.gameRepository.findOne(gameId, {
      select: ['name', 'company', 'genre', 'id'],
    });

    if (!game) throw new NotFoundException('Jogo não encontrado');

    return game;
  }

  async updateGame(updateGameDto: UpdateGameDto, id: string): Promise<Game> {
    const game = await this.findGameById(id);

    const { name, company, genre } = updateGameDto;

    game.name = name ? name : game.name;
    game.company = company ? company : game.company;
    game.genre = genre ? genre : game.genre;

    try {
      await game.save();
      return game;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async deleteGame(gameId: string) {
    const result = await this.gameRepository.delete({ id: gameId });

    if (result.affected === 0) {
      throw new NotFoundException(
        'Não foi encontrado um jogo com o ID informado',
      );
    }
  }

  async findGames(
    queryDto: FindGamesQueryDto,
  ): Promise<{ games: Game[]; total: number }> {
    const games = await this.gameRepository.findGames(queryDto);
    return games;
  }
}
