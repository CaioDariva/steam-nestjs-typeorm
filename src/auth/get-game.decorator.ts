import { createParamDecorator } from '@nestjs/common';
import { Game } from 'src/games/game.entity';

export const GetGame = createParamDecorator((data, req): Game => {
  const game = req.args[0].game;
  return game;
});
