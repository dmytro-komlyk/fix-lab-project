import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { Issue } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import {
  createIssueSchema,
  outputIssueSchema,
  updateIssueSchema
} from './schemas/issue.schema';

@Injectable()
export class IssuesService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<Issue[]> {
    return await this.prisma.issue.findMany({
      include: {
        image: true,
        benefits: {
          include: {
            icon: true
          }
        },
        gadgets: true
      }
    });
  }

  public async findAllActive(): Promise<Issue[]> {
    return await this.prisma.issue.findMany({
      where: {
        isActive: true
      },
      include: {
        image: true,
        benefits: {
          include: {
            icon: true
          }
        },
        gadgets: true
      }
    });
  }

  public async findBySlug(slug: string): Promise<outputIssueSchema> {
    const issue = await this.prisma.issue.findUnique({
      where: {
        slug: slug
      },
      include: {
        image: true,
        benefits: {
          include: {
            icon: true
          }
        },
        gadgets: true
      }
    });

    if (!issue) {
      throw new NotFoundException(`Issue with slug "${slug}" was not found`);
    }

    return issue;
  }

  public async findById(id: string): Promise<Issue> {
    const issue = await this.prisma.issue.findUnique({
      where: {
        id
      },
      include: {
        image: true,
        benefits: {
          include: {
            icon: true
          }
        },
        gadgets: true
      }
    });

    if (!issue) {
      throw new NotFoundException(`Issue with ID "${id}" was not found`);
    }

    return issue;
  }

  public async create(data: createIssueSchema): Promise<Issue> {
    const foundIssue = await this.prisma.issue.findFirst({
      where: {
        slug: data.slug
      }
    });

    if (foundIssue) {
      throw new BadRequestException(`Issue with slug "${data.slug}" already exists`);
    }

    const createdIssue = await this.prisma.issue.create({
      data
    });

    const issue = await this.findById(createdIssue.id);

    return issue;
  }

  public async update(data: updateIssueSchema): Promise<Issue> {
    const { id, ...newData } = data;
    const issue = await this.findById(data.id);

    if (!issue) {
      throw new NotFoundException(`Issue with ID ${id} was not found`);
    }

    const updatedIssue = await this.prisma.issue.update({
      where: { id },
      data: newData,
      include: {
        image: true,
        benefits: {
          include: {
            icon: true
          }
        },
        gadgets: true
      }
    });
    return updatedIssue;
  }

  public async remove(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const contact = await this.prisma.issue.delete({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`Issue with ID ${id} was not found`);
    }

    return id;
  }
}
