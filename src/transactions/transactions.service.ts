import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsRepository } from './transaction.repository';
import { Document } from 'mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionsRepository.create(
      createTransactionDto,
    );

    return transaction.save();
  }

  findAll(user: User & Document) {
    return this.transactionsRepository._repository.find({
      $or: [
        {
          initiator: user._id,
        },
        {
          destination: user._id,
        },
      ],
    });
  }
}
