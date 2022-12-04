import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { AuthRepository } from 'src/auth/auth.repository';
import { User } from 'src/entities/user.entity';
import { TransactionsService } from 'src/transactions/transactions.service';
import { TransferDTO } from './dto/transfer.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly userRepository: AuthRepository,
    private readonly transactionsService: TransactionsService,
  ) {}

  async transfer(data: TransferDTO, user: User) {
    if (data.phoneNumber == user.phoneNumber)
      throw new ConflictException('You cant transfer to yourself');

    const initiator = await this.userRepository.findOneOrFail({
      phoneNumber: user.phoneNumber,
    });
    const recipient = await this.userRepository.findOneOrFail({
      phoneNumber: data.phoneNumber,
    });

    if (initiator.balance < data.amount)
      throw new BadRequestException('Insufficient Balance');

    initiator.balance -= data.amount;
    recipient.balance += data.amount;

    await initiator.save();
    await recipient.save();

    await this.transactionsService.create({
      amount: data.amount,
      type: 'transfer',
      destination: recipient._id,
      initiator: initiator._id,
    });

    return initiator;
  }

  async deposit(amount: number, user: User) {
    const initiator = await this.userRepository.findOneOrFail({
      phoneNumber: user.phoneNumber,
    });

    await this.transactionsService.create({
      amount: amount,
      type: 'deposit',
      destination: initiator._id,
      initiator: initiator._id,
    });

    initiator.balance += amount;

    await initiator.save();
    return initiator;
  }

  async withdraw(amount: number, user: User) {
    const initiator = await this.userRepository.findOneOrFail({
      phoneNumber: user.phoneNumber,
    });

    await this.transactionsService.create({
      amount: amount,
      type: 'withdraw',
      destination: initiator._id,
      initiator: initiator._id,
    });

    if (initiator.balance < amount)
      throw new BadRequestException('Insufficient Balance');

    initiator.balance -= amount;

    await initiator.save();
    return initiator;
  }
}
