import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { TRPCError } from '@trpc/server';
import {
  createIssueSchema,
  outputIssueSchema,
  updateIssueSchema
} from './schemas/issue.schema';

@Injectable()
export class IssuesService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputIssueSchema[]> {
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

  public async findAllActive(): Promise<outputIssueSchema[]> {
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
      throw new TRPCError({
        message: `Issue with slug "${slug}" was not found`,
        code: 'NOT_FOUND'
      });
    }

    return issue;
  }

  public async findById(id: string): Promise<outputIssueSchema> {
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
      throw new TRPCError({
        message: `Issue with ID "${id}" was not found`,
        code: 'NOT_FOUND'
      });
    }

    return issue;
  }

  public async create(data: createIssueSchema): Promise<outputIssueSchema> {
    const foundIssue = await this.prisma.issue.findFirst({
      where: {
        slug: data.slug
      }
    });

    if (foundIssue) {
      throw new TRPCError({
        message: `Issue with slug "${data.slug}" already exists`,
        code: 'FORBIDDEN'
      });
    }

    const createdIssue = await this.prisma.issue.create({
      data
    });

    const issue = await this.findById(createdIssue.id);

    return issue;
  }

  public async update(data: updateIssueSchema): Promise<outputIssueSchema> {
    const { id, ...newData } = data;
    const issue = await this.findById(data.id);

    if (!issue) {
      throw new TRPCError({
        message: `Issue with ID ${id} was not found`,
        code: 'NOT_FOUND'
      });
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
    const contact = await this.prisma.issue.delete({ where: { id } }).catch(() => {
      throw new TRPCError({
        message: `Issue with ID ${id} was not found`,
        code: 'NOT_FOUND'
      });
    });

    return contact.id;
  }
}
