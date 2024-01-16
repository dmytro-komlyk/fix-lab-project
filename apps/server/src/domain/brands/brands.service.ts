import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { TRPCError } from '@trpc/server';
import {
  createBrandSchema,
  outputBrandSchema,
  updateBrandSchema
} from './schemas/brand.schema';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputBrandSchema[]> {
    return await this.prisma.brand.findMany({
      include: { icon: true }
    });
  }

  public async findActive(): Promise<outputBrandSchema[]> {
    return await this.prisma.brand.findMany({
      where: { isActive: true },
      include: { icon: true }
    });
  }

  public async findBySlug(slug: string): Promise<outputBrandSchema> {
    const brand = await this.prisma.brand.findUnique({
      where: { slug },
      include: { icon: true }
    });

    if (!brand) {
      throw new TRPCError({
        message: `Brand with slug "${slug}" was not found`,
        code: 'NOT_FOUND'
      });
    }

    return brand;
  }

  public async findById(id: string): Promise<outputBrandSchema> {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: { icon: true }
    });

    if (!brand) {
      throw new TRPCError({
        message: `Brand with ID "${id}" was not found`,
        code: 'NOT_FOUND'
      });
    }

    return brand;
  }

  public async create(data: createBrandSchema): Promise<outputBrandSchema> {
    const foundBrand = await this.prisma.brand.findFirst({
      where: { slug: data.slug }
    });

    if (foundBrand) {
      throw new TRPCError({
        message: `Brand with slug "${data.title}" already exists`,
        code: 'FORBIDDEN'
      });
    }

    const createdBrand = await this.prisma.brand.create({ data });
    const brand = await this.findById(createdBrand.id);

    return brand;
  }

  public async update(data: updateBrandSchema): Promise<outputBrandSchema> {
    const { id, ...newData } = data;
    const brand = await this.findById(data.id);

    if (!brand) {
      throw new TRPCError({
        message: `Brand with ID ${id} was not found`,
        code: 'NOT_FOUND'
      });
    }

    const updatedBrand = await this.prisma.brand.update({
      where: { id },
      data: newData,
      include: { icon: true }
    });

    return updatedBrand;
  }

  public async remove(id: string): Promise<string> {
    const brand = await this.prisma.brand.delete({ where: { id } }).catch(() => {
      throw new TRPCError({
        message: `Brand with ID ${id} was not found`,
        code: 'NOT_FOUND'
      });
    });

    return brand.id;
  }
}
