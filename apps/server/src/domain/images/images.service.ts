import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { TRPCError } from '@trpc/server';
import { imageSchema, uploadImageSchema } from './schemas/image.schema';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<imageSchema[]> {
    return await this.prisma.image.findMany();
  }
  public async findAllIcons(): Promise<imageSchema[]> {
    return await this.prisma.image.findMany({ where: { type: 'icon ' } });
  }
  public async findAllPictures(): Promise<imageSchema[]> {
    return await this.prisma.image.findMany({ where: { type: 'picture ' } });
  }
  public async findAllBlog(): Promise<imageSchema[]> {
    return await this.prisma.image.findMany({ where: { type: 'blog ' } });
  }

  public async findById(id: string): Promise<imageSchema> {
    const image = await this.prisma.image.findUnique({
      where: {
        id,
      },
    });

    if (!image) {
      throw new TRPCError({
        message: `Image with ID "${id}" was not found`,
        code: 'NOT_FOUND',
      });
    }

    return image;
  }

  public async upload(data: uploadImageSchema): Promise<imageSchema> {
    const createdImage = await this.prisma.image.create({ data });
    const image = await this.findById(createdImage.id);

    return image;
  }

  public async update(data: imageSchema): Promise<imageSchema> {
    const { id, ...newData } = data;
    const image = await this.findById(id);

    if (!image) {
      throw new TRPCError({
        message: `Image with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    const updatedImage = await this.prisma.image.update({
      where: { id },
      data: newData,
    });

    return updatedImage;
  }

  public async remove(id: string): Promise<string> {
    const image = await this.prisma.image
      .delete({ where: { id } })
      .catch(() => {
        throw new TRPCError({
          message: `Image with ID ${id} was not found`,
          code: 'NOT_FOUND',
        });
      });

    return image.id;
  }
}
