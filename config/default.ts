import { config } from 'dotenv';

config();
export const configDefault = {
  port: process.env.PORT,
  host: 'localhost'
};
