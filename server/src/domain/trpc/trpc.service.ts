import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcService {
  createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({});
  trpc = initTRPC.context<Awaited<ReturnType<typeof this.createContext>>>().create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
