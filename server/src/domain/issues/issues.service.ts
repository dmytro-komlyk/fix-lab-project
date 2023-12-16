import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { PrismaService } from '../prisma/prisma.service';

import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssuesService {
  constructor(private prisma: PrismaService) {}

  public async findAll() {
    return await this.prisma.issues.findMany({
      include: {
        image: true,
        benefits: true,
        icon: true //?
      }
    });

    // .populate({ path: 'image' })
    // .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findAllActive() {
    return await this.prisma.issues.findMany({
      where: {
        isActive: true
      },
      include: {
        image: true,
        benefits: true,
        icon: true //?
      }
    });
  }

  public async findOneByQuery(slug: string) {
    return await this.prisma.issues.findUnique({
      where: {
        slug: slug
      },
      include: {
        image: true,
        benefits: true,
        icon: true //?
      }
    });
    // .findOne(query)
    // .select('-isActive')
    // .populate({ path: 'image' })
    // .populate({ path: 'benefits', populate: { path: 'icon' } });
  }

  public async findOneById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const issue = await this.prisma.issues.findUnique({
      where: {
        id
      },
      include: {
        image: true,
        benefits: true,
        icon: true //?
      }
    });
    // .findById(id)
    // .populate('image')
    // .populate({ path: 'benefits', populate: { path: 'icon' } });

    if (!issue) {
      throw new NotFoundException(`Issue with ID "${id}" was not found`);
    }

    return issue;
  }

  public async create(dto: CreateIssueDto) {
    const foundIssue = await this.prisma.issues.findUnique({
      where: {
        slug: dto.slug
      }
    });

    if (foundIssue) {
      throw new BadRequestException(`Issue with slug "${dto.slug}" already exists`);
    }

    const createdIssue = await this.prisma.issues.create({
      data: dto
    });

    const issue = await this.findOneById(createdIssue.id);
    return issue;
  }

  public async update(id: string, dto: UpdateIssueDto) {
    await this.findOneById(id);

    const updatedIssue = await this.prisma.issues.update({
      where: { id },
      data: dto,
      include: {
        image: true,
        benefits: true,
        icon: true //?
      }
    });
    return updatedIssue;
  }

  public async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const contact = await this.prisma.issues.delete({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`Issue with ID ${id} was not found`);
    }

    return id;
  }
}
