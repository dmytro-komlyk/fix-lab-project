import { Module } from '@nestjs/common';

import { ArticlesService } from './articles.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ArticlesService, PrismaService],
})
export class ArticlesModule {}
