import { INestApplication, Injectable } from '@nestjs/common';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { z } from 'zod';

import { ArticlesService } from '../articles/articles.service';
import { BenefitsService } from '../benefits/benefits.service';
import { BrandsService } from '../brands/brands.service';
import { ContactsService } from '../contacts/contacts.service';
import { GadgetsService } from '../gadgets/gadgets.service';
import { IssuesService } from '../issues/issues.service';
import { PrismaService } from '../prisma/prisma.service';
import { TrpcService } from './trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly gadgetsService: GadgetsService,
    private readonly issuesService: IssuesService,
    private readonly benefitsService: BenefitsService,
    private readonly brandsService: BrandsService,
    private readonly articlesService: ArticlesService,
    private readonly contactsService: ContactsService
  ) {}

  appRouter = this.trpc.router({
    getGadgetsQuery: this.trpc.procedure.query(async () => {
      // return await this.gadgetsService.findActive();
    }),
    getGadgetBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        // return await this.gadgetsService.findOneByQuery({ ...input });
      }),

    getBrandsQuery: this.trpc.procedure.query(async () => {
      // return await this.brandsService.findActive();
    }),
    getBrandBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        // return await this.brandsService.findOneByQuery({ ...input });
      }),

    // BENEFITS
    getBenefitsAll: this.trpc.procedure.query(async () => {
      return await this.benefitsService.findAll();
    }),

    getBenefits: this.trpc.procedure.query(async () => {
      return await this.benefitsService.findActive();
    }),

    getBenefitById: this.trpc.procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return await this.benefitsService.findOneById(input.id);
      }),

    createBenefit: this.trpc.procedure
      .input(
        z.object({
          icon: z.string(),
          title: z.string(),
          isActive: z.boolean()
        })
      )
      .mutation(async ({ input }) => {
        return await this.benefitsService.create({ ...input });
      }),

    updateBenefit: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
          icon: z.string(),
          title: z.string(),
          isActive: z.boolean()
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updateData } = input;
        return await this.benefitsService.update(id, updateData);
      }),

    removeBenefit: this.trpc.procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return await this.benefitsService.remove(input.id);
      }),

    // ISSUES
    getIssuesAll: this.trpc.procedure.query(async () => {
      return await this.benefitsService.findAll();
    }),

    getIssues: this.trpc.procedure.query(async () => {
      return await this.benefitsService.findActive();
    }),

    getIssueById: this.trpc.procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return await this.benefitsService.findOneById(input.id);
      }),

    getIssueBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await this.issuesService.findOneByQuery(input.slug);
      }),

    createIssue: this.trpc.procedure
      .input(
        z.object({
          isActive: z.boolean(),
          slug: z.string(),
          title: z.string(),
          price: z.string(),
          info: z.string(),
          description: z.string(),
          image: z.string(),
          preview: z.string(),
          benefits: z.array(z.string()),
          metadata: z.object({
            title: z.string(),
            description: z.string(),
            keywords: z.string()
          })
        })
      )
      .mutation(async ({ input }) => {
        return await this.issuesService.create({ ...input });
      }),

    updateIssue: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
          isActive: z.boolean(),
          slug: z.string(),
          title: z.string(),
          price: z.string(),
          info: z.string(),
          description: z.string(),
          image: z.string(),
          preview: z.string(),
          benefits: z.array(z.string()),
          metadata: z.object({
            title: z.string(),
            description: z.string(),
            keywords: z.string()
          })
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updateData } = input;
        return await this.articlesService.update(id, updateData);
      }),

    removeIssue: this.trpc.procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return await this.issuesService.remove(input.id);
      }),

    // ARTICLES
    createArticle: this.trpc.procedure
      .input(
        z.object({
          isActive: z.boolean(),
          slug: z.string(),
          title: z.string(),
          text: z.string(),
          image: z.string(),
          preview: z.string(),
          metadata: z.object({
            title: z.string(),
            description: z.string(),
            keywords: z.string()
          })
        })
      )
      .mutation(async ({ input }) => {
        return await this.articlesService.create({ ...input });
      }),

    updateArticle: this.trpc.procedure
      .input(
        z.object({
          id: z.string(),
          isActive: z.boolean(),
          slug: z.string(),
          title: z.string(),
          text: z.string(),
          image: z.string(),
          preview: z.string(),
          metadata: z.object({
            title: z.string(),
            description: z.string(),
            keywords: z.string()
          })
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...updateData } = input;
        return await this.articlesService.update(id, updateData);
      }),

    removeArticle: this.trpc.procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return await this.articlesService.remove(input.id);
      }),

    getArticlesQuery: this.trpc.procedure
      .input(
        z.object({
          page: z.number().optional(),
          limit: z.number().optional(),
          sort: z.string().optional()
        })
      )
      .query(async ({ input }) => {
        return await this.articlesService.findWithPagination({ ...input }, {});
      }),

    getArticleById: this.trpc.procedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await this.articlesService.findOneById(input.id);
      }),

    getArticleBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await this.articlesService.findOneByQuery({ ...input });
      }),

    // CONTACTS
    getContactsQuery: this.trpc.procedure.query(async () => {
      return await this.contactsService.findActive();
    })
  });

  static getAppRouter(): AppRouter {
    const trpcRouter = new TrpcRouter(
      new TrpcService(),
      new GadgetsService(new PrismaService()),
      new IssuesService(new PrismaService()),
      new BenefitsService(new PrismaService()),
      new BrandsService(new PrismaService()),
      new ArticlesService(new PrismaService()),
      new ContactsService(new PrismaService())
    );
    return trpcRouter.appRouter;
  }

  async applyMiddleware(app: INestApplication): Promise<void> {
    app.use(
      '/trpc',
      createExpressMiddleware({
        router: this.appRouter,
        createContext: this.trpc.createContext
      })
    );
  }
}

export const appRouter = TrpcRouter.getAppRouter();
export type AppRouter = TrpcRouter['appRouter'];
