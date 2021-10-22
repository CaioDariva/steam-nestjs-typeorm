import { IsString, IsOptional } from 'class-validator';

export class UpdateGameDto {
  @IsOptional()
  @IsString({ message: 'Informe um nome válido ' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Informe uma empresa válida ' })
  company: string;

  @IsOptional()
  @IsString({ message: 'Informe um genero válido ' })
  genre: string;
}
