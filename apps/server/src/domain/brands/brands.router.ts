import { Injectable } from '@nestjs/common';

import z from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { BrandsService } from './brands.service';

import {
  createBrandSchema,
  outputBrandSchema,
  updateBrandSchema
} from './schemas/brand.schema';

@Injectable()
export class BrandsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly brandsService: BrandsService
  ) {}

  brandsRouter = this.trpc.router({
    getAllBrands: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllBrands',
          tags: ['brands'],
          summary: 'Read all brands'
        }
      })
      .input(z.void())
      .output(z.array(outputBrandSchema))
      .query(async () => {
        return await this.brandsService.findAll();
      }),
    getAllPublishedBrands: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllPublishedBrands',
          tags: ['brands'],
          summary: 'Read all published brands'
        }
      })
      .input(z.void())
      .output(z.array(outputBrandSchema))
      .query(async () => {
        return await this.brandsService.findActive();
      }),
    getBySlugBrand: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getBySlugBrand',
          tags: ['brands'],
          summary: 'Read a brand by slug'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(outputBrandSchema)
      .query(async ({ input }) => {
        return await this.brandsService.findBySlug(input.id);
      }),
    getByIdBrand: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdBrand',
          tags: ['brands'],
          summary: 'Read a brand by id'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(outputBrandSchema)
      .query(async ({ input }) => {
        return await this.brandsService.findById(input.id);
      }),
    createBrand: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createBrand',
          tags: ['brands'],
          summary: 'Create a new brand'
        }
      })
      .input(createBrandSchema)
      .output(outputBrandSchema)
      .mutation(async ({ input }) => {
        return await this.brandsService.create({ ...input });
      }),
    updateBrand: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateBrand',
          tags: ['brands'],
          summary: 'Update brand'
        }
      })
      .input(updateBrandSchema)
      .output(outputBrandSchema)
      .mutation(async ({ input }) => {
        return await this.brandsService.update(input);
      }),
    removeBrand: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeBrand',
          tags: ['brands'],
          summary: 'Remove brand'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        const id = await this.brandsService.remove(input.id);
        return { id };
      })
  });
}
