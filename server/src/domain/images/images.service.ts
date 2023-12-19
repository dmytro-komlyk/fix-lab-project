import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { Image } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<Image[]> {
    return await this.prisma.image.findMany();
  }

  public async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const image = await this.prisma.image.findUnique({
      where: {
        id
      }
    });

    if (!image) {
      throw new NotFoundException(`Image with ID "${id}" was not found`);
    }

    return image;
  }

  // public async findAllByType({ type }: { type: string }): Promise<Image[]> {
  //   return await this.imageModel.find({ type });
  // }

  public async add(dto: any) {
    const addedImage = await this.prisma.image.create({
      data: dto
    });
    const image = await this.findById(addedImage.id);

    return image;
  }

  // public async update(id: string, dto: any) {
  //   await this.findOneById(id);

  //   const image = await this.imageModel.findByIdAndUpdate(id, dto, {
  //     new: true
  //   });

  //   return image;
  // }

  // public async remove(id: string) {
  //   if (!Types.ObjectId.isValid(id)) {
  //     throw new NotFoundException(`Incorrect ID - ${id}`);
  //   }

  //   const image = await this.imageModel.findByIdAndDelete(id);

  //   if (!image) {
  //     throw new NotFoundException(`Image with ID ${id} was not found`);
  //   }

  //   return id;
  // }
}
