import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
    cors: {
      allowedHeaders: [
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin:',
      ],
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(5000);
};
bootstrap();
