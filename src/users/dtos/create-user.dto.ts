import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Informe um endereço de e-mail' })
  @IsEmail({}, { message: 'Utilize um e-mail válido' })
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}
