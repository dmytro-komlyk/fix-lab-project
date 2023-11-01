import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';

import { TrpcService } from './trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure.query(() => {
      return 'Hello, world!';
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
