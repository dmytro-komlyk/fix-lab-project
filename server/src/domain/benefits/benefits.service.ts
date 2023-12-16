import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { PrismaService } from '../prisma/prisma.service';

import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';

@Injectable()
export class BenefitsService {
  constructor(private prisma: PrismaService) {}

  public async findAll() {
    return await this.prisma.benefits.findMany();
    // include: { icon: true }
  }

  public async findActive() {
    return await this.prisma.benefits.findMany({
      where: { isActive: true }
      // include: { icon: true }
    });
  }

  public async findOneById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const benefit = await this.prisma.benefits.findFirst({
      where: { id }
      // include: { icon: true }
    });
    // findById(id).populate('icon');

    if (!benefit) {
      throw new NotFoundException(`Brand with ID "${id}" was not found`);
    }

    return benefit;
  }

  public async create(dto: CreateBenefitDto) {
    const foundBenefit = await this.prisma.benefits.findFirst({
      where: { title: dto.title }
    });

    if (foundBenefit) {
      throw new BadRequestException(
        `Benefit with slug "${dto.title}" already exists`
      );
    }
    const createdBenefit = await this.prisma.benefits.create({ data: dto });
    const benefit = await this.findOneById(createdBenefit.id);
    return benefit;
  }

  public async update(id: string, dto: UpdateBenefitDto) {
    await this.findOneById(id);

    const benefit = await this.prisma.benefits.update({
      where: { id },
      data: dto
      // include: { icon: true }
    });

    return benefit;
  }

  public async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const benefit = await this.prisma.benefits.delete({ where: { id } });

    if (!benefit) {
      throw new NotFoundException(`Brand with ID ${id} was not found`);
    }

    return id;
  }
}
