import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

  Logger.log('', 'Start');
  Logger.log('API RUNNING: http://localhost', 'Start');
  Logger.log('', 'Start');
}

bootstrap();
