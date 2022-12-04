import { NotFoundException } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { IGenericRepository } from './repository.abstract';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  findAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  find(data: Partial<T>): Promise<T[]> {
    return this._repository
      .find({
        ...data,
      })
      .populate(this._populateOnFind)
      .exec();
  }

  findOneById(id: any): Promise<T & Document> {
    return this._repository.findById(id).exec();
  }

  findOne(data: Partial<T>): Promise<T & Document> {
    return this._repository.findOne(data).exec();
  }

  async findOneOrFail(data: Partial<T>): Promise<T & Document> {
    const item = await this._repository.findOne(data).exec();
    if (!item) throw new NotFoundException('Item Not Found');
    return item;
  }

  create(item: T): Promise<T & Document> {
    return this._repository.create(item);
  }

  update(id: string, item: Record<string, any>) {
    return this._repository.findByIdAndUpdate(id, item);
  }
}
