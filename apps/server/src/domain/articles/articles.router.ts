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
    getAllArticles: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllArticles',
          tags: ['articles'],
          summary: 'Read all articles'
        }
      })
      .input(z.void())
      .output(z.array(outputArticleSchema))
      .query(async () => {
        return await this.articlesService.findAll();
      }),
    getByPaginationArticles: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByPaginationArticles',
          tags: ['articles'],
          summary: 'Read pagination articles'
        }
      })
      .input(paginationArticleSchema)
      .output(outputArticleWithPaginationSchema)
      .query(async ({ input }) => {
        return await this.articlesService.findWithPagination({ ...input });
      }),

    getByIdArticle: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdArticle',
          tags: ['articles'],
          summary: 'Read a article by id'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(outputArticleSchema)
      .query(async ({ input }) => {
        return await this.articlesService.findById(input.id);
      }),
    getBySlugArticle: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getBySlugArticle',
          tags: ['articles'],
          summary: 'Read a article by slug'
        }
      })
      .input(z.object({ slug: z.string() }))
      .output(outputArticleSchema)
      .query(async ({ input }) => {
        return await this.articlesService.findBySlug(input.slug);
      }),
    createArticle: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createArticle',
          tags: ['articles'],
          summary: 'Create a new article'
        }
      })
      .input(createArticleSchema)
      .output(outputArticleSchema)
      .mutation(async ({ input }) => {
        return await this.articlesService.create({ ...input });
      }),

    updateArticle: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateArticle',
          tags: ['articles'],
          summary: 'Update article'
        }
      })
      .input(updateArticleSchema)
      .output(outputArticleSchema)
      .mutation(async ({ input }) => {
        return await this.articlesService.update(input);
      }),

    removeArticle: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeArticle',
          tags: ['articles'],
          summary: 'Delete article'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        const id = await this.articlesService.remove(input.id);
        return { id };
      })
  });
}
