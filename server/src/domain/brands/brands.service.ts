import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { Types } from 'mongoose';

import { Brand } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import {
  createBrandSchema,
  outputBrandSchema,
  updateBrandSchema
} from './schemas/brand.schema';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<Brand[]> {
    return await this.prisma.brand.findMany({
      include: { icon: true }
    });
  }

  public async findActive(): Promise<Brand[]> {
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
      throw new NotFoundException(`Brand with slug "${slug}" was not found`);
    }

    return brand;
  }

  public async findById(id: string): Promise<Brand> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: { icon: true }
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID "${id}" was not found`);
    }

    return brand;
  }

  public async create(data: createBrandSchema): Promise<Brand> {
    const foundBrand = await this.prisma.brand.findFirst({
      where: { slug: data.slug }
    });

    if (foundBrand) {
      throw new UnprocessableEntityException(
        `Brand with slug "${data.slug}" already exists`
      );
    }

    const createdBrand = await this.prisma.brand.create({ data });
    const brand = await this.findById(createdBrand.id);

    return brand;
  }

  public async update(data: updateBrandSchema): Promise<Brand> {
    const { id, ...newData } = data;
    const brand = await this.findById(data.id);

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} was not found`);
    }

    const updatedBrand = await this.prisma.brand.update({
      where: { id },
      data: newData,
      include: { icon: true }
    });

    return updatedBrand;
  }

  public async remove(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const brand = await this.prisma.brand.delete({ where: { id } });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} was not found`);
    }

    return id;
  }
}
