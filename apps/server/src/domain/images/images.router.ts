import { Injectable } from '@nestjs/common';

import z from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { ImagesService } from './images.service';

import { imageSchema, uploadImageSchema } from './schemas/image.schema';

@Injectable()
export class ImagesRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly imagesService: ImagesService,
  ) {}

  imagesRouter = this.trpc.router({
    getAllImages: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllImages',
          tags: ['images'],
          summary: 'Read all images',
        },
      })
      .input(z.void())
      .output(z.array(imageSchema))
      .query(async () => {
        return await this.imagesService.findAll();
      }),
    getAllIcons: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllIcons',
          tags: ['images'],
          summary: 'Read all icons',
        },
      })
      .input(z.void())
      .output(z.array(imageSchema))
      .query(async () => {
        return await this.imagesService.findAllIcons();
      }),
    getAllPictures: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllPictures',
          tags: ['images'],
          summary: 'Read all pictures',
        },
      })
      .input(z.void())
      .output(z.array(imageSchema))
      .query(async () => {
        return await this.imagesService.findAllPictures();
      }),
    getAllBlogPictures: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllBlogPictures',
          tags: ['images'],
          summary: 'Read all blog pictures',
        },
      })
      .input(z.void())
      .output(z.array(imageSchema))
      .query(async () => {
        return await this.imagesService.findAllBlog();
      }),
    uploadImage: this.trpc.procedure
      .input(uploadImageSchema)
      .output(imageSchema)
      .mutation(async ({ input }) => {
        return await this.imagesService.upload(input);
      }),
    updateImage: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateImage',
          tags: ['images'],
          summary: 'Update image',
        },
      })
      .input(imageSchema)
      .output(imageSchema)
      .mutation(async ({ input }) => {
        return await this.imagesService.update(input);
      }),
    removeImage: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeImage',
          tags: ['images'],
          summary: 'Remove image',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        const id = await this.imagesService.remove(input.id);
        return { id };
      }),
  });
}
