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
    getAllGadgets: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllGadgets',
          tags: ['gadgets'],
          summary: 'Read all gadgets'
        }
      })
      .input(z.void())
      .output(z.array(outputGadgetSchema))
      .query(async () => {
        return await this.gadgetsService.findAll();
      }),
    getAllPublishedGadgets: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllPublishedGadgets',
          tags: ['gadgets'],
          summary: 'Read all published gadgets'
        }
      })
      .input(z.void())
      .output(z.array(outputGadgetSchema))
      .query(async () => {
        return await this.gadgetsService.findAllActive();
      }),
    getByIdGadget: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdGadget',
          tags: ['gadgets'],
          summary: 'Read a gadget by id'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(outputGadgetSchema)
      .mutation(async ({ input }) => {
        return await this.gadgetsService.findById(input.id);
      }),
    getBySlugGadget: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getBySlugGadget',
          tags: ['gadgets'],
          summary: 'Read a gadget by slug'
        }
      })
      .input(z.object({ slug: z.string() }))
      .output(outputGadgetSchema)
      .query(async ({ input }) => {
        return await this.gadgetsService.findBySlug(input.slug);
      }),
    createGadget: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createGadget',
          tags: ['gadgets'],
          summary: 'Create a new gadget'
        }
      })
      .input(createGadgetSchema)
      .output(outputGadgetSchema)
      .mutation(async ({ input }) => {
        return await this.gadgetsService.create({ ...input });
      }),
    updateGadget: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateGadget',
          tags: ['gadgets'],
          summary: 'Update gadget'
        }
      })
      .input(updateGadgetSchema)
      .output(outputGadgetSchema)
      .mutation(async ({ input }) => {
        return await this.gadgetsService.update(input);
      })
  });
}
