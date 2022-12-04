import { IsString, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  initiator?: string;

  @IsString()
  destination?: string;

  @IsString()
  type: 'transfer' | 'deposit' | 'withdraw';

  @IsNumber()
  amount: number;
}
