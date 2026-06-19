import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  app.enableCors({ origin: frontendUrl, credentials: true });
  app.use('/stripe/webhook', express.raw({ type: '*/*' }));
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
