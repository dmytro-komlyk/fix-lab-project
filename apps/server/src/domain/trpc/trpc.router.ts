import { INestApplication, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { OpenAPIV3 } from 'openapi-types';
import swaggerUi from 'swagger-ui-express';
import { generateOpenApiDocument } from 'trpc-openapi';

import { ArticlesRouter } from '../articles/articles.router';
import { BenefitsRouter } from '../benefits/benefits.router';
import { BrandsRouter } from '../brands/brands.router';
import { ContactsRouter } from '../contacts/contacts.router';
import { GadgetsRouter } from '../gadgets/gadgets.router';
import { ImagesRouter } from '../images/images.router';
import { IssuesRouter } from '../issues/issues.router';

import express from 'express';
import { ArticlesService } from '../articles/articles.service';
import { AuthRouter } from '../auth/auth.router';
import { AuthService } from '../auth/auth.service';
import { BenefitsService } from '../benefits/benefits.service';
import { BrandsService } from '../brands/brands.service';
import { ContactsService } from '../contacts/contacts.service';
import { GadgetsService } from '../gadgets/gadgets.service';
import { ImagesService } from '../images/images.service';
import { IssuesService } from '../issues/issues.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserRouter } from '../users/users.router';
import { UserService } from '../users/users.service';
import { TrpcService } from './trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly issues: IssuesRouter,
    private readonly benefits: BenefitsRouter,
    private readonly brands: BrandsRouter,
    private readonly articles: ArticlesRouter,
    private readonly contacts: ContactsRouter,
    private readonly images: ImagesRouter,
    private readonly gadget: GadgetsRouter,
    private readonly users: UserRouter,
    private readonly auth: AuthRouter
  ) {}

  appRouter = this.trpc.router({
    gadgets: this.gadget.gadgetsRouter,
    issues: this.issues.issuesRouter,
    benefits: this.benefits.benefitsRouter,
    brands: this.brands.brandsRouter,
    articles: this.articles.articlesRouter,
    contacts: this.contacts.contactsRouter,
    images: this.images.imagesRouter,
    users: this.users.usersRouter,
    auth: this.auth.authRouter
  });

  openApiDocument: OpenAPIV3.Document = generateOpenApiDocument(this.appRouter, {
    title: 'tRPC OpenAPI',
    description: 'OpenAPI compliant REST API built using tRPC with Express',
    version: '1.0.0',
    baseUrl: process.env.APP_BASE_URL as string,
    tags: ['users', 'benefits', 'brands', 'contacts', 'gadgets', 'images', 'issues']
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static getAppRouter() {
    const prismaService = new PrismaService();
    const jwtService = new JwtService();
    const trpcService = new TrpcService(prismaService, jwtService);

    const trpcRouter = new TrpcRouter(
      trpcService,
      new IssuesRouter(trpcService, new IssuesService(prismaService)),
      new BenefitsRouter(trpcService, new BenefitsService(prismaService)),
      new BrandsRouter(trpcService, new BrandsService(prismaService)),
      new ArticlesRouter(trpcService, new ArticlesService(prismaService)),
      new ContactsRouter(trpcService, new ContactsService(prismaService)),
      new ImagesRouter(trpcService, new ImagesService(prismaService)),
      new GadgetsRouter(trpcService, new GadgetsService(prismaService)),
      new UserRouter(trpcService, new UserService(prismaService)),
      new AuthRouter(
        trpcService,
        new UserService(prismaService),
        new AuthService(prismaService, jwtService)
      )
    );
    return {
      appRouter: trpcRouter.appRouter,
      createCallerFactory: trpcRouter.trpc.createCallerFactory
    };
  }

  async applyMiddleware(app: INestApplication): Promise<void> {
    app.use(express.json());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app.use((req: any, _res: any, next: any) => {
      // request logger
      console.log('⬅️ ', req.method, req.path, req.body, req.query);

      next();
    });
    app.use(
      `/${process.env.APP_API}/${process.env.APP_TRPC}`,
      createExpressMiddleware({
        router: this.appRouter,
        createContext: this.trpc.createContext
      })
    );
    app.use(
      `/${process.env.APP_SWAGER}`,
      swaggerUi.serve,
      swaggerUi.setup(this.openApiDocument)
    );
  }
}

export const { appRouter, createCallerFactory } = TrpcRouter.getAppRouter();
export type AppRouter = TrpcRouter['appRouter'];
