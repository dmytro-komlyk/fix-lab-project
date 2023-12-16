import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  public async findAll() {
    const contacts = await this.prisma.contacts.findMany();
    // console.log(contacts);
    // return contacts;
  }

  public async findActive() {
    const contacts = await this.prisma.contacts.findMany({
      where: {
        isActive: true
      }
    });
    console.log(contacts);
    // const contacts = await this.contactModel
    //   .find({ isActive: true })
    //   .populate({ path: 'image' });

    // return contacts;
  }

  // public async findOneById(id: string): Promise<Contact> {
  //   const contact = await this.contactModel.findById(id).populate({ path: 'image' });

  //   if (!contact) {
  //     throw new NotFoundException(`Contact with ID ${id} was not found`);
  //   }

  //   return contact;
  // }

  // public async create(dto: CreateContactDto): Promise<Contact> {
  //   const createdContact = await new this.contactModel(dto).save();

  //   return createdContact;
  // }

  // public async update(id: string, dto: UpdateContactDto): Promise<Contact | null> {
  //   const contact = await this.contactModel.findById(id);

  //   if (!contact) {
  //     throw new NotFoundException(`Contact with ID ${id} was not found`);
  //   }

  //   const updatedContact = await this.contactModel
  //     .findByIdAndUpdate(id, dto, {
  //       new: true
  //     })
  //     .populate({ path: 'image' });

  //   return updatedContact;
  // }

  // public async remove(id: string): Promise<string> {
  //   if (!Types.ObjectId.isValid(id)) {
  //     throw new NotFoundException(`Incorrect ID - ${id}`);
  //   }

  //   const contact = await this.contactModel.findByIdAndDelete(id);

  //   if (!contact) {
  //     throw new NotFoundException(`Contact with ID ${id} was not found`);
  //   }

  //   return id;
  // }
}
