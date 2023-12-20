import { Injectable } from '@nestjs/common';

import z from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { ArticlesService } from './articles.service';

import {
  createArticleSchema,
  outputArticleSchema,
  outputArticleWithPaginationSchema,
  paginationArticleSchema,
  updateArticleSchema
} from './schemas/article.schema';

@Injectable()
export class ArticlesRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly articlesService: ArticlesService
  ) {}

  articlesRouter = this.trpc.router({
    getAll: this.trpc.procedure.query(async () => {
      return await this.articlesService.findAll();
    }),
    create: this.trpc.procedure
      .input(createArticleSchema)
      .mutation(async ({ input }) => {
        return await this.articlesService.create({ ...input });
      }),

    update: this.trpc.procedure
      .input(updateArticleSchema)
      .mutation(async ({ input }) => {
        return await this.articlesService.update(input);
      }),

    remove: this.trpc.procedure.input(z.string()).mutation(async ({ input }) => {
      return await this.articlesService.remove(input);
    }),
    getByPagination: this.trpc.procedure
      .input(paginationArticleSchema)
      .output(outputArticleWithPaginationSchema)
      .query(async ({ input }) => {
        return await this.articlesService.findWithPagination({ ...input });
      }),

    getById: this.trpc.procedure.input(z.string()).query(async ({ input }) => {
      return await this.articlesService.findById(input);
    }),

    getBySlug: this.trpc.procedure
      .input(z.string())
      .output(outputArticleSchema)
      .query(async ({ input }) => {
        return await this.articlesService.findBySlug(input);
      })
  });
}
