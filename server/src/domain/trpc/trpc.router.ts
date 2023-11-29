import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';

import { IPaginationAnswer } from '@shared/interfaces/pagination-answer.interface';
import { z } from 'zod';

import { ArticlesService } from '@domain/articles/articles.service';
import { BrandsService } from '@domain/brands/brands.service';
import { ContactsService } from '@domain/contacts/contacts.service';
import { GadgetsService } from '@domain/gadgets/gadgets.service';
import { IssuesService } from '@domain/issues/issues.service';
import { TrpcService } from './trpc.service';

import { Article } from '@domain/articles/schemas/article.schema';
import { Brand } from '@domain/brands/schemas/brand.schema';
import { Contact } from '@domain/contacts/schemas/contact.schema';
import { Gadget } from '@domain/gadgets/schemas/gadget.schema';
import { Issue } from '@domain/issues/schemas/issue.schema';

@Injectable()
export class TrpcRouter {
  static appRouter: any;
  static appContext: any;

  constructor(
    private readonly trpc: TrpcService,
    private readonly gadgetsService: GadgetsService,
    private readonly issuesService: IssuesService,
    private readonly brandsService: BrandsService,
    private readonly contactsService: ContactsService,
    private readonly articlesService: ArticlesService
  ) {}

  appRouter = this.trpc.router({
    getGadgetsQuery: this.trpc.procedure.query(async (): Promise<Gadget[]> => {
      return await this.gadgetsService.findActive();
    }),
    getGadgetBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }: { input: any }): Promise<Gadget | null> => {
        return await this.gadgetsService.findOneByQuery({ ...input });
      }),

    getIssuesQuery: this.trpc.procedure.query(async (): Promise<Issue[]> => {
      return await this.issuesService.findAllActive();
    }),
    getIssueBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }: { input: any }): Promise<Issue | null> => {
        return await this.issuesService.findOneByQuery({ ...input });
      }),

    getBrandsQuery: this.trpc.procedure.query(async (): Promise<Brand[]> => {
      return await this.brandsService.findActive();
    }),
    getBrandBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }: { input: any }): Promise<Brand | null> => {
        return await this.brandsService.findOneByQuery({ ...input });
      }),

    getArticlesQuery: this.trpc.procedure
      .input(
        z.object({
          page: z.number().optional(),
          limit: z.number().optional(),
          sort: z.string().optional()
        })
      )
      .query(
        async ({ input }: { input: any }): Promise<IPaginationAnswer<Article>> => {
          return await this.articlesService.findWithPagination({ ...input }, {});
        }
      ),
    getArticleBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }): Promise<Article | null> => {
        return await this.articlesService.findOneByQuery({ ...input });
      }),

    getContactsQuery: this.trpc.procedure.query(async (): Promise<Contact[]> => {
      return await this.contactsService.findActive();
    })
  });

  appContext = this.trpc.createContext;

  async applyMiddleware(app: INestApplication): Promise<void> {
    app.use(
      (
        req: { method: any; path: any; body: any; query: any },
        _res: any,
        next: () => void
      ) => {
        // request logger
        console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

        next();
      }
    );

    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext: this.trpc.createContext
      })
    );
  }
}

export const appRouter = TrpcRouter['appRouter'];
export type AppRouter = TrpcRouter['appRouter'];
export const appContext = TrpcRouter['appContext'];
