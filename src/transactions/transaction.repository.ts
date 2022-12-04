import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/common/database/repository.generic';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from 'src/entities/transaction.entity';

@Injectable()
export class TransactionsRepository extends MongoGenericRepository<Transaction> {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {
    super(transactionModel);
  }
}
