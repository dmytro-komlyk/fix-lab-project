import { Injectable } from '@nestjs/common';

import z from 'zod';

import { TrpcService } from '../trpc/trpc.service';
import { ContactsService } from './contacts.service';

import {
  createContactSchema,
  outputContactSchema,
  updateContactSchema
} from './schemas/contact.schema';

@Injectable()
export class ContactsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly contactsService: ContactsService
  ) {}

  contactsRouter = this.trpc.router({
    getAll: this.trpc.procedure.query(async () => {
      return await this.contactsService.findAll();
    }),
    getAllPublished: this.trpc.procedure
      .output(z.array(outputContactSchema))
      .query(async () => {
        return await this.contactsService.findActive();
      }),
    getById: this.trpc.procedure.input(z.string()).query(async ({ input }) => {
      return await this.contactsService.findById(input);
    }),
    create: this.trpc.procedure
      .input(createContactSchema)
      .mutation(async ({ input }) => {
        return await this.contactsService.create({ ...input });
      }),
    update: this.trpc.procedure
      .input(updateContactSchema)
      .mutation(async ({ input }) => {
        return await this.contactsService.update(input);
      }),
    remove: this.trpc.procedure.input(z.string()).mutation(async ({ input }) => {
      return await this.contactsService.remove(input);
    })
  });
}
