import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { TrpcRouter } from '@domain/trpc/trpc.router';
import { useContainer } from 'class-validator';

import { AppModule } from '@domain/app.module';

import { PREFIX, PUBLIC_FOLDER } from '@constants/routes.constants';

(async (): Promise<void> => {
  const httpsOptions = {
    key: readFileSync(
      resolve(
        process.cwd(),
        `../../nginx/data/custom_ssl/${process.env.APP_SSL_FOLDER}/privkey.pem`,
      ),
    ),
    cert: readFileSync(
      resolve(
        process.cwd(),
        `../../nginx/data/custom_ssl/${process.env.APP_SSL_FOLDER}/fullchain.pem`,
      ),
    ),
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
    rawBody: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Range'],
    exposedHeaders: 'Content-Range',
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
