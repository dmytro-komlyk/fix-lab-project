import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { Contact } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { createContactSchema, updateContactSchema } from './schemas/contact.schema';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany({
      include: { image: true }
    });
    return contacts;
  }

  public async findActive(): Promise<Contact[]> {
    const contacts = await this.prisma.contact.findMany({
      where: {
        isActive: true
      },
      include: { image: true }
    });

    return contacts;
  }

  public async findById(id: string): Promise<Contact> {
    const contact = await this.prisma.contact.findFirst({
      where: { id },
      include: { image: true }
    });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} was not found`);
    }

    return contact;
  }

  public async create(data: createContactSchema): Promise<Contact> {
    const createdContact = await this.prisma.contact.create({ data });
    const contact = await this.findById(createdContact.id);
    return contact;
  }

  public async update(data: updateContactSchema): Promise<Contact> {
    const { id, ...newData } = data;

    const contact = await this.findById(id);

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} was not found`);
    }

    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: newData
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
