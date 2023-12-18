import { Injectable } from '@nestjs/common';

import z from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { BrandsService } from './brands.service';

import { createBrandSchema, updateBrandSchema } from './schemas/brand.schema';

@Injectable()
export class BrandsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly brandsService: BrandsService
  ) {}

  brandsRouter = this.trpc.router({
    getAll: this.trpc.procedure.query(async () => {
      return await this.brandsService.findAll();
    }),
    getAllPublished: this.trpc.procedure.query(async () => {
      return await this.brandsService.findActive();
    }),
    getBySlug: this.trpc.procedure.input(z.string()).query(async ({ input }) => {
      return await this.brandsService.findBySlug(input);
    }),
    getById: this.trpc.procedure.input(z.string()).query(async ({ input }) => {
      return await this.brandsService.findById(input);
    }),
    create: this.trpc.procedure
      .input(createBrandSchema)
      .mutation(async ({ input }) => {
        return await this.brandsService.create({ ...input });
      }),
    update: this.trpc.procedure
      .input(updateBrandSchema)
      .mutation(async ({ input }) => {
        return await this.brandsService.update(input);
      }),
    remove: this.trpc.procedure.input(z.string()).mutation(async ({ input }) => {
      return await this.brandsService.remove(input);
    })
  });
}
