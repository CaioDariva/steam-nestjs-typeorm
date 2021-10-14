import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Informe um endereço de e-mail.' })
  @IsEmail({}, { message: 'Utilize um e-mail válido.' })
  @MaxLength(200, { message: 'O endereço de e-mail é muito grande.' })
  email: string;
  @IsNotEmpty({ message: 'Informe o nome do usuário.' })
  @MaxLength(200, { message: 'O nome é muito grande.' })
  name: string;
  @IsNotEmpty({ message: 'Informe uma senha.' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  password: string;
  @IsNotEmpty({ message: 'Informe a confirmação de senha.' })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter pelo menos 6 caracteres.',
  })
  passwordConfirmation: string;
}
