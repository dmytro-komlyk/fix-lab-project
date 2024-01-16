import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { TRPCError } from '@trpc/server';
import {
  createBenefitSchema,
  outputBenefitSchema,
  updateBenefitSchema
} from './schemas/benefit.schema';

@Injectable()
export class BenefitsService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputBenefitSchema[]> {
    return await this.prisma.benefit.findMany({
      include: { icon: true }
    });
  }

  public async findActive(): Promise<outputBenefitSchema[]> {
    return await this.prisma.benefit.findMany({
      where: { isActive: true },
      include: { icon: true }
    });
  }

  public async findById(id: string): Promise<outputBenefitSchema> {
    const benefit = await this.prisma.benefit.findUnique({
      where: { id },
      include: { icon: true }
    });

    if (!benefit) {
      throw new TRPCError({
        message: `Brand with ID "${id}" was not found`,
        code: 'NOT_FOUND'
      });
    }

    return benefit;
  }

  public async create(data: createBenefitSchema): Promise<outputBenefitSchema> {
    const foundBenefit = await this.prisma.benefit.findFirst({
      where: { title: data.title }
    });

    if (foundBenefit) {
      throw new TRPCError({
        message: `Benefit with slug "${data.title}" already exists`,
        code: 'FORBIDDEN'
      });
    }
    const createdBenefit = await this.prisma.benefit.create({ data });
    const benefit = await this.findById(createdBenefit.id);

    return benefit;
  }

  public async update(data: updateBenefitSchema): Promise<outputBenefitSchema> {
    const { id, ...newData } = data;
    const benefit = await this.findById(id);

    if (!benefit) {
      throw new TRPCError({
        message: `Benefit with ID ${id} was not found`,
        code: 'NOT_FOUND'
      });
    }

    const updatedBenefit = await this.prisma.benefit.update({
      where: { id },
      data: newData,
      include: { icon: true }
    });

    return updatedBenefit;
  }

  public async remove(id: string): Promise<string> {
    const benefit = await this.prisma.benefit.delete({ where: { id } }).catch(() => {
      throw new TRPCError({
        message: `Benefit with ID ${id} was not found`,
        code: 'NOT_FOUND'
      });
    });

    return benefit.id;
  }
}
