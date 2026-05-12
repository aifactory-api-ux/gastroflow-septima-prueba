import * as dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  url: string;
}

export function databaseConfig(): DatabaseConfig {
  const host = process.env.POSTGRES_HOST || 'localhost';
  const port = parseInt(process.env.POSTGRES_PORT || '25432', 10);
  const user = process.env.POSTGRES_USER || 'postgres';
  const password = process.env.POSTGRES_PASSWORD || '';
  const database = process.env.POSTGRES_DB || 'gastroflow';
  const databaseUrl = process.env.DATABASE_URL || `postgres://${user}:${password}@${host}:${port}/${database}`;

  if (!password) {
    throw new Error('POSTGRES_PASSWORD is required');
  }

  if (isNaN(port)) {
    throw new Error('POSTGRES_PORT must be a valid integer');
  }

  return {
    host,
    port,
    user,
    password,
    database,
    url: databaseUrl,
  };
}