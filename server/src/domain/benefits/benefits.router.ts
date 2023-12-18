import { Injectable } from '@nestjs/common';

import { z } from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { BenefitsService } from './benefits.service';

import { createBenefitSchema, updateBenefitSchema } from './schemas/benefit.schema';

@Injectable()
export class BenefitsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly benefitsService: BenefitsService
  ) {}

  benefitsRouter = this.trpc.router({
    getAll: this.trpc.procedure.query(async () => {
      return await this.benefitsService.findAll();
    }),
    getAllPublished: this.trpc.procedure.query(async () => {
      return await this.benefitsService.findActive();
    }),
    getById: this.trpc.procedure.input(z.string()).query(async ({ input }) => {
      return await this.benefitsService.findOneById(input);
    }),
    create: this.trpc.procedure
      .input(createBenefitSchema)
      .mutation(async ({ input }) => {
        return await this.benefitsService.create({ ...input });
      }),
    update: this.trpc.procedure
      .input(updateBenefitSchema)
      .mutation(async ({ input }) => {
        return await this.benefitsService.update(input);
      }),
    remove: this.trpc.procedure.input(z.string()).mutation(async ({ input }) => {
      return await this.benefitsService.remove(input);
    })
  });
}
