import * as dotenv from 'dotenv';

dotenv.config();

interface RedisConfig {
  host: string;
  port: number;
  url: string;
}

export function redisConfig(): RedisConfig {
  const host = process.env.REDIS_HOST || 'localhost';
  const port = parseInt(process.env.REDIS_PORT || '26379', 10);
  const redisUrl = process.env.REDIS_URL || `redis://${host}:${port}`;

  if (!host) {
    throw new Error('REDIS_HOST is required');
  }

  if (isNaN(port)) {
    throw new Error('REDIS_PORT must be a valid integer');
  }

  return {
    host,
    port,
    url: redisUrl,
  };
}