import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

let transformer: any;
eval(`import('superjson')`).then((module: any) => {
  transformer = module.default;
});

@Injectable()
export class TrpcService {
  createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
    req,
    res
  });

  trpc = initTRPC.context<Awaited<ReturnType<typeof this.createContext>>>().create({
    /**
     * @see https://trpc.io/docs/v10/data-transformers
     */
    transformer,
    /**
     * @see https://trpc.io/docs/v10/error-formatting
     */
    errorFormatter({ shape }) {
      return shape;
    }
  });

  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
