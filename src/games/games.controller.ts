import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  ForbiddenException,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateGameDto } from './dtos/create-games.dto';
import { GamesService } from './games.service';
import { ReturnGameDto } from './dtos/return-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from 'src/users/user-roles.enum';
import { UpdateGameDto } from './dtos/update-games.dto';
import { Game } from './game.entity';
import { GetGame } from 'src/auth/get-game.decorator';
import { FindGamesQueryDto } from './dtos/find-games.dto';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Role(UserRole.ADMIN)
  async createGame(
    @Body(ValidationPipe) createGameDto: CreateGameDto,
  ): Promise<ReturnGameDto> {
    const game = await this.gamesService.createGame(createGameDto);
    return {
      game,
      message: 'Jogo cadastrado com sucesso',
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  async findGameById(@Param('id') id: string): Promise<ReturnGameDto> {
    const game = await this.gamesService.findGameById(id);
    return {
      game,
      message: 'Jogo encontrado',
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Role(UserRole.ADMIN)
  async updateGame(
    @Body(ValidationPipe) updateGameDto: UpdateGameDto,
    @GetGame() game: Game,
    @Param('id') id: string,
  ) {
    return this.gamesService.updateGame(updateGameDto, id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Role(UserRole.ADMIN)
  async deleteGame(@Param('id') id: string) {
    await this.gamesService.deleteGame(id);
    return {
      message: 'Jogo removido com sucesso',
    };
  }

  @Get()
  async findGames(@Query() query: FindGamesQueryDto) {
    const found = await this.gamesService.findGames(query);

    return {
      found,
      message: 'Jogos enconstrados',
    };
  }
}
