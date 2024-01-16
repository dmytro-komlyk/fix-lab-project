import { Injectable } from '@nestjs/common';

import { z } from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { BenefitsService } from './benefits.service';

import {
  createBenefitSchema,
  outputBenefitSchema,
  updateBenefitSchema
} from './schemas/benefit.schema';

@Injectable()
export class BenefitsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly benefitsService: BenefitsService
  ) {}

  benefitsRouter = this.trpc.router({
    getAllBenefits: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllBenefits',
          tags: ['benefits'],
          summary: 'Read all benefits'
        }
      })
      .input(z.void())
      .output(z.array(outputBenefitSchema))
      .query(async () => {
        return await this.benefitsService.findAll();
      }),
    getAllPublishedBenefits: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllPublishedBenefits',
          tags: ['benefits'],
          summary: 'Read all published benefits'
        }
      })
      .input(z.void())
      .output(z.array(outputBenefitSchema))
      .query(async () => {
        return await this.benefitsService.findActive();
      }),
    getByIdBenefit: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdBenefit',
          tags: ['benefits'],
          summary: 'Read a benefit by id'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(outputBenefitSchema)
      .query(async ({ input }) => {
        return await this.benefitsService.findById(input.id);
      }),
    createBenefit: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createBenefit',
          tags: ['benefits'],
          summary: 'Create a new benefit'
        }
      })
      .input(createBenefitSchema)
      .output(outputBenefitSchema)
      .mutation(async ({ input }) => {
        return await this.benefitsService.create({ ...input });
      }),
    updateBenefit: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateBenefit',
          tags: ['benefits'],
          summary: 'Update benefit'
        }
      })
      .input(updateBenefitSchema)
      .output(outputBenefitSchema)
      .mutation(async ({ input }) => {
        return await this.benefitsService.update(input);
      }),
    removeBenefit: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeBenefit',
          tags: ['benefits'],
          summary: 'Delete benefit'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        const id = await this.benefitsService.remove(input.id);
        return { id };
      })
  });
}
