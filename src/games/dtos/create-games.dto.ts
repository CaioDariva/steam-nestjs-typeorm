import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty({ message: 'Informe o nome do jogo' })
  name: string;

  @IsNotEmpty({ message: 'Informe o nome do usuário' })
  company: string;

  @IsNotEmpty({ message: 'Informe uma senha' })
  genre: string;
}
