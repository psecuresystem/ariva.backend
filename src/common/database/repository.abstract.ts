export abstract class IGenericRepository<T> {
  abstract findAll(): Promise<T[]>;

  abstract findOneById(id: string): Promise<T>;

  abstract findOne(data: Partial<T>): Promise<T>;

  abstract findOneOrFail(data: Partial<T>): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T): void;
}
