import { INestApplication, Injectable } from '@nestjs/common';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { ArticlesRouter } from '../articles/articles.router';
import { BenefitsRouter } from '../benefits/benefits.router';
import { BrandsRouter } from '../brands/brands.router';
import { ContactsRouter } from '../contacts/contacts.router';
import { GadgetsRouter } from '../gadgets/gadgets.router';
import { ImagesRouter } from '../images/images.router';
import { IssuesRouter } from '../issues/issues.router';

import { ArticlesService } from '../articles/articles.service';
import { BenefitsService } from '../benefits/benefits.service';
import { BrandsService } from '../brands/brands.service';
import { ContactsService } from '../contacts/contacts.service';
import { GadgetsService } from '../gadgets/gadgets.service';
import { ImagesService } from '../images/images.service';
import { IssuesService } from '../issues/issues.service';
import { PrismaService } from '../prisma/prisma.service';
import { TrpcService } from './trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly gadget: GadgetsRouter,
    private readonly issues: IssuesRouter,
    private readonly benefits: BenefitsRouter,
    private readonly brands: BrandsRouter,
    private readonly articles: ArticlesRouter,
    private readonly contacts: ContactsRouter,
    private readonly images: ImagesRouter
  ) {}

  appRouter = this.trpc.router({
    gadgets: this.gadget.gadgetsRouter,
    issues: this.issues.issuesRouter,
    benefits: this.benefits.benefitsRouter,
    brands: this.brands.brandsRouter,
    articles: this.articles.articlesRouter,
    contacts: this.contacts.contactsRouter,
    images: this.images.imagesRouter
  });

  static getAppRouter(): AppRouter {
    const prismaService = new PrismaService({});
    const trpcService = new TrpcService();

    const trpcRouter = new TrpcRouter(
      trpcService,
      new GadgetsRouter(trpcService, new GadgetsService(prismaService)),
      new IssuesRouter(trpcService, new IssuesService(prismaService)),
      new BenefitsRouter(trpcService, new BenefitsService(prismaService)),
      new BrandsRouter(trpcService, new BrandsService(prismaService)),
      new ArticlesRouter(trpcService, new ArticlesService(prismaService)),
      new ContactsRouter(trpcService, new ContactsService(prismaService)),
      new ImagesRouter(trpcService, new ImagesService(prismaService))
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
