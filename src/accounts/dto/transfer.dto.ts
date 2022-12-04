import { IsPhoneNumber, IsNumber } from 'class-validator';

export class TransferDTO {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNumber()
  amount: number;
}
