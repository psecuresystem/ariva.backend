import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
