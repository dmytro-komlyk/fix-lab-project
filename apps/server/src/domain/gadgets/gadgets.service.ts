import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { TRPCError } from '@trpc/server';
import {
  createGadgetSchema,
  outputGadgetSchema,
  updateGadgetSchema
} from './schemas/gadget.schema';

@Injectable()
export class GadgetsService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputGadgetSchema[]> {
    return await this.prisma.gadget.findMany({
      include: {
        icon: true,
        brands: {
          include: {
            icon: true
          }
        },
        issues: {
          include: {
            image: true,
            benefits: {
              include: {
                icon: true
              }
            }
          }
        },
        gallery: true
      }
    });
  }

  public async findAllActive(): Promise<outputGadgetSchema[]> {
    return await this.prisma.gadget.findMany({
      where: {
        isActive: true
      },
      include: {
        icon: true,
        brands: {
          include: {
            icon: true
          }
        },
        issues: {
          include: {
            image: true,
            benefits: {
              include: {
                icon: true
              }
            }
          }
        },
        gallery: true
      }
    });
  }

  public async findBySlug(slug: string): Promise<outputGadgetSchema> {
    const gadget = await this.prisma.gadget.findUnique({
      where: { slug: slug },
      include: {
        icon: true,
        brands: {
          include: {
            icon: true
          }
        },
        issues: {
          include: {
            image: true,
            benefits: {
              include: {
                icon: true
              }
            }
          }
        },
        gallery: true
      }
    });

    if (!gadget) {
      throw new TRPCError({
        message: `Gadget with slug "${slug}" was not found`,
        code: 'NOT_FOUND'
      });
    }

    return gadget;
  }

  public async findById(id: string): Promise<outputGadgetSchema> {
    const gadget = await this.prisma.gadget.findUnique({
      where: { id },
      include: {
        icon: true,
        brands: {
          include: {
            icon: true
          }
        },
        issues: {
          include: {
            image: true,
            benefits: {
              include: {
                icon: true
              }
            }
          }
        },
        gallery: true
      }
    });

    if (!gadget) {
      throw new TRPCError({
        message: `Gadget with ID "${id}" was not found`,
        code: 'NOT_FOUND'
      });
    }

    return gadget;
  }

  public async create(data: createGadgetSchema): Promise<outputGadgetSchema> {
    const foundGadget = await this.prisma.gadget.findFirst({
      where: { slug: data.slug }
    });

    if (foundGadget) {
      throw new TRPCError({
        message: `Gadget with slug "${data.slug}" already exists`,
        code: 'FORBIDDEN'
      });
    }

    const createdGadget = await this.prisma.gadget.create({ data });
    const gadget = await this.findById(createdGadget.id);

    return gadget;
  }

  public async update(data: updateGadgetSchema): Promise<outputGadgetSchema> {
    const { id, ...newData } = data;
    const gadget = await this.findById(id);

    if (!gadget) {
      throw new TRPCError({
        message: `Gadget with ID ${id} was not found`,
        code: 'NOT_FOUND'
      });
    }

    const updatedGadget = await this.prisma.gadget.update({
      where: { id },
      data: newData,
      include: {
        icon: true,
        brands: {
          include: {
            icon: true
          }
        },
        issues: {
          include: {
            image: true,
            benefits: {
              include: {
                icon: true
              }
            }
          }
        },
        gallery: true
      }
    });

    return updatedGadget;
  }

  public async remove(id: string): Promise<string> {
    const gadget = await this.prisma.gadget.delete({ where: { id } }).catch(() => {
      throw new TRPCError({
        message: `Gadget with ID ${id} was not found`,
        code: 'NOT_FOUND'
      });
    });

    return gadget.id;
  }
}
