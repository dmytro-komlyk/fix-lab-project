import { Module } from '@nestjs/common';

import { ArticlesRouter } from './articles.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { ArticlesService } from './articles.service';

@Module({
  imports: [PrismaModule],
  providers: [ArticlesService, ArticlesRouter, TrpcService],
  exports: [ArticlesService]
})
export class ArticlesModule {}
