import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoGenericRepository } from 'src/common/database/repository.generic';
import { User } from 'src/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthRepository extends MongoGenericRepository<User> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
