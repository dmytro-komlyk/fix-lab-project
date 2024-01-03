import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { PrismaService } from '../prisma/prisma.service';

import {
  createContactSchema,
  outputContactSchema,
  updateContactSchema
} from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputContactSchema[]> {
    const contacts = await this.prisma.contact.findMany({
      include: { image: true }
    });
    return contacts;
  }

  public async findActive(): Promise<outputContactSchema[]> {
    const contacts = await this.prisma.contact.findMany({
      where: {
        isActive: true
      },
      include: { image: true }
    });

    return contacts;
  }

  public async findById(id: string): Promise<outputContactSchema> {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
      include: { image: true }
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} was not found`);
    }

    return contact;
  }

  public async create(data: createContactSchema): Promise<outputContactSchema> {
    const createdContact = await this.prisma.contact.create({ data });
    const contact = await this.findById(createdContact.id);
    return contact;
  }

  public async update(data: updateContactSchema): Promise<outputContactSchema> {
    const { id, ...newData } = data;

    const contact = await this.findById(id);

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} was not found`);
    }

    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: newData,
      include: { image: true }
    });

    return updatedContact;
  }

  public async remove(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const contact = await this.prisma.contact.delete({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} was not found`);
    }

    return id;
  }
}
