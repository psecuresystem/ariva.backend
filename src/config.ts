import { config as initEnv } from 'dotenv';

initEnv();

export const config = {
  mongoConnectionString: process.env.MONGODB_URI,
  PORT: process.env.PORT || 3000,
};
