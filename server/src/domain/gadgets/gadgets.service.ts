import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { Gadget } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import {
  createGadgetSchema,
  outputGadgetSchema,
  updateGadgetSchema
} from './schemas/gadget.schema';

@Injectable()
export class GadgetsService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<Gadget[]> {
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

  public async findAllActive(): Promise<Gadget[]> {
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
      throw new NotFoundException(`Gadget with slug "${slug}" was not found`);
    }

    return gadget;
  }

  public async findById(id: string): Promise<Gadget> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

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
      throw new NotFoundException(`Gadget with ID "${id}" was not found`);
    }

    return gadget;
  }

  public async create(data: createGadgetSchema): Promise<Gadget> {
    const foundGadget = await this.prisma.gadget.findFirst({
      where: { slug: data.slug }
    });

    if (foundGadget) {
      throw new BadRequestException(
        `Gadget with slug "${data.slug}" already exists`
      );
    }

    const createdGadget = await this.prisma.gadget.create({ data });
    const gadget = await this.findById(createdGadget.id);

    return gadget;
  }

  public async update(data: updateGadgetSchema): Promise<Gadget> {
    const { id, ...newData } = data;
    const gadget = await this.findById(id);

    if (!gadget) {
      throw new NotFoundException(`Gadget with ID ${id} was not found`);
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
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const gadget = await this.prisma.gadget.delete({ where: { id } });

    if (!gadget) {
      throw new NotFoundException(`Gadget with ID ${id} was not found`);
    }

    return id;
  }
}
