import { Injectable } from '@nestjs/common';

import z from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { GadgetsService } from './gadgets.service';

@Injectable()
export class GadgetsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly gadgetsService: GadgetsService
  ) {}

  gadgetsRouter = this.trpc.router({
    getGadgetsQuery: this.trpc.procedure.query(async () => {
      // return await this.gadgetsService.findActive();
    }),
    getGadgetBySlugQuery: this.trpc.procedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        // return await this.gadgetsService.findOneByQuery({ ...input });
      })
  });
}
