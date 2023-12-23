import { Injectable } from '@nestjs/common';

import z from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { GadgetsService } from './gadgets.service';

import {
  createGadgetSchema,
  outputGadgetSchema,
  updateGadgetSchema
} from './schemas/gadget.schema';

@Injectable()
export class GadgetsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly gadgetsService: GadgetsService
  ) {}

  gadgetsRouter = this.trpc.router({
    getAll: this.trpc.procedure.query(async () => {
      return await this.gadgetsService.findAll();
    }),
    getAllPublished: this.trpc.procedure.query(async () => {
      return await this.gadgetsService.findAllActive();
    }),
    getById: this.trpc.procedure.input(z.string()).mutation(async ({ input }) => {
      return await this.gadgetsService.findById(input);
    }),
    getBySlug: this.trpc.procedure
      .input(z.string())
      .output(outputGadgetSchema)
      .query(async ({ input }) => {
        return await this.gadgetsService.findBySlug(input);
      }),
    create: this.trpc.procedure
      .input(createGadgetSchema)
      .mutation(async ({ input }) => {
        return await this.gadgetsService.create({ ...input });
      }),
    update: this.trpc.procedure
      .input(updateGadgetSchema)
      .mutation(async ({ input }) => {
        return await this.gadgetsService.update(input);
      })
  });
}
