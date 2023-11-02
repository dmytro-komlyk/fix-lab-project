import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';

import { IPaginationAnswer } from '@app/shared/interfaces/pagination-answer.interface';
import { z } from 'zod';

import { TrpcService } from './trpc.service';
import { ArticlesService } from '@app/domain/articles/articles.service';
import { BrandsService } from '@app/domain/brands/brands.service';
import { ContactsService } from '@app/domain/contacts/contacts.service';
import { GadgetsService } from '@app/domain/gadgets/gadgets.service';
import { IssuesService } from '@app/domain/issues/issues.service';

import { Article } from '@app/domain/articles/schemas/article.schema';
import { Brand } from '@app/domain/brands/schemas/brand.schema';
import { Contact } from '@app/domain/contacts/schemas/contact.schema';
import { Gadget } from '@app/domain/gadgets/schemas/gadget.schema';
import { Issue } from '@app/domain/issues/schemas/issue.schema';

@Injectable()
export class TrpcRouter {
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
      .query(async ({ input }): Promise<Gadget | null> => {
        return await this.gadgetsService.findOneByQuery({ ...input });
      }),

    getIssuesQuery: this.trpc.procedure.query(async (): Promise<Issue[]> => {
      return await this.issuesService.findAllActive();
    }),
    getIssueBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }): Promise<Issue | null> => {
        return await this.issuesService.findOneByQuery({ ...input });
      }),

    getBrandsQuery: this.trpc.procedure.query(async (): Promise<Brand[]> => {
      return await this.brandsService.findActive();
    }),
    getBrandBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }): Promise<Brand | null> => {
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
      .query(async ({ input }): Promise<IPaginationAnswer<Article>> => {
        return await this.articlesService.findWithPagination({ ...input }, {});
      }),
    getArticleBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }): Promise<Article | null> => {
        return await this.articlesService.findOneByQuery({ ...input });
      }),

    getContactsQuery: this.trpc.procedure.query(async (): Promise<Contact[]> => {
      return await this.contactsService.findActive();
    })
  });

  async applyMiddleware(app: INestApplication): Promise<void> {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({ router: this.appRouter })
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
