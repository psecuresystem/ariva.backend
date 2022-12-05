import * as mongoose from 'mongoose';
import { config } from 'src/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(config.mongoConnectionString),
  },
];
