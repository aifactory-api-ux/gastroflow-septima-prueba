import * as dotenv from 'dotenv';

dotenv.config();

interface RabbitMQConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  url: string;
}

export function rabbitmqConfig(): RabbitMQConfig {
  const host = process.env.RABBITMQ_HOST || 'localhost';
  const port = parseInt(process.env.RABBITMQ_PORT || '25672', 10);
  const user = process.env.RABBITMQ_USER || 'guest';
  const password = process.env.RABBITMQ_PASSWORD || 'guest';
  const rabbitmqUrl = process.env.RABBITMQ_URL || `amqp://${user}:${password}@${host}:${port}`;

  if (!user) {
    throw new Error('RABBITMQ_USER is required');
  }

  if (isNaN(port)) {
    throw new Error('RABBITMQ_PORT must be a valid integer');
  }

  return {
    host,
    port,
    user,
    password,
    url: rabbitmqUrl,
  };
}