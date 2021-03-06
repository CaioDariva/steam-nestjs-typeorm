import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Informe um endereço de email' })
  @IsEmail({}, { message: 'Informe um endereço de email válido' })
  @MaxLength(200, {
    message: 'O endereço de email de ter menos de 200 carcateres',
  })
  email: string;

  @IsNotEmpty({ message: 'Informe o nome do usuário' })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 carcateres',
  })
  name: string;

  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 carcateres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve onter pelo menos uma letra maiúscula, uma letra minúsucla, um número e um caractere.',
  })
  password: string;

  @IsNotEmpty({ message: 'Informe a confirmação de senha' })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 carcateres',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve onter pelo menos uma letra maiúscula, uma letra minúsucla, um número e um caractere.',
  })
  passwordConfirmation: string;
}
