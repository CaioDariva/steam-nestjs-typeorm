import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'Informe uma senha válida' })
  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 carcateres' })
  @MaxLength(32, { message: 'A senha deve ter no máximo 32 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve onter pelo menos uma letra maiúscula, uma letra minúsucla, um número e um caractere.',
  })
  password: string;

  @IsString({ message: 'Informe uma confirmação de senha válida' })
  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(6, {
    message: 'A confirmação da senha deve ter no mínimo 6 carcateres',
  })
  @MaxLength(32, {
    message: 'A confirmação da senha deve ter no máximo 32 caracteres',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'A senha deve onter pelo menos uma letra maiúscula, uma letra minúsucla, um número e um caractere.',
  })
  passwordConfirmation: string;
}
