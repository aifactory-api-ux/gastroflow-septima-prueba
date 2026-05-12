import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 23001;
  await app.listen(port);
  console.log(`GastroFlow API running on port ${port}`);
}
bootstrap();