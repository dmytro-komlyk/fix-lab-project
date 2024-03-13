import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { TrpcRouter } from '@domain/trpc/trpc.router';
import { useContainer } from 'class-validator';

import { AppModule } from '@domain/app.module';

import { PREFIX, PUBLIC_FOLDER } from '@constants/routes.constants';

(async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    // cors: true,
  });

  app.enableCors({
    origin: true,
    methods: ['GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Range'],
    exposedHeaders: 'Content-Range',
    credentials: true,
  });

  app.setGlobalPrefix(PREFIX);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useStaticAssets(`${process.cwd()}/${PUBLIC_FOLDER}`, {
    prefix: `/${PUBLIC_FOLDER}`,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);

  await app.listen(process.env.APP_PORT || 3000);
})();
