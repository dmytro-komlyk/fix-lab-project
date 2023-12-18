import { Injectable } from '@nestjs/common';

import z from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { ImagesService } from './images.service';

import { uploadImageSchema } from './schemas/image.schema';

@Injectable()
export class ImagesRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly imagesService: ImagesService
  ) {}

  imagesRouter = this.trpc.router({
    getAll: this.trpc.procedure.query(async () => {
      return await this.imagesService.findAll();
    }),
    getIconAll: this.trpc.procedure.query(async () => {
      return await this.imagesService.findAll();
    }),
    getPicturesAll: this.trpc.procedure.query(async () => {
      return await this.imagesService.findAll();
    }),
    getBlogPicturesAll: this.trpc.procedure.query(async () => {
      return await this.imagesService.findAll();
    }),
    uploadIcon: this.trpc.procedure
      .input(uploadImageSchema)
      .query(async ({ input }) => {
        // return await this.imagesService.create(input);
      }),
    uploadPicture: this.trpc.procedure.query(async () => {
      // return await this.imagesService.create(input);
    }),
    uploadBlogPicture: this.trpc.procedure.query(async () => {
      // return await this.imagesService.create();
    }),
    updateIconId: this.trpc.procedure.query(async () => {
      // return await this.imagesService.create();
    }),
    updatePictureId: this.trpc.procedure.query(async () => {
      // return await this.imagesService.create();
    }),
    updateBlogPictureId: this.trpc.procedure.query(async () => {
      // return await this.imagesService.create();
    }),
    remove: this.trpc.procedure.input(z.string()).mutation(async ({ input }) => {
      // return await this.imagesService.remove(input);
    })
  });
}
