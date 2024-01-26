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
    getAllContacts: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllContacts',
          tags: ['contacts'],
          summary: 'Read all contacts'
        }
      })
      .input(z.void())
      .output(z.array(outputContactSchema))
      .query(async () => {
        return await this.contactsService.findAll();
      }),
    getAllPublishedContacts: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getAllPublishedContacts',
          tags: ['contacts'],
          summary: 'Read all published contacts'
        }
      })
      .input(z.void())
      .output(z.array(outputContactSchema))
      .query(async () => {
        return await this.contactsService.findActive();
      }),
    getByIdContact: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdContact',
          tags: ['contacts'],
          summary: 'Read a contact by id'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(outputContactSchema)
      .query(async ({ input }) => {
        return await this.contactsService.findById(input.id);
      }),
    createContact: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createContact',
          tags: ['contacts'],
          summary: 'Create a new contact'
        }
      })
      .input(createContactSchema)
      .output(outputContactSchema)
      .mutation(async ({ input }) => {
        return await this.contactsService.create({ ...input });
      }),
    updateContact: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/updateContact',
          tags: ['contacts'],
          summary: 'Update contact'
        }
      })
      .input(updateContactSchema)
      .output(outputContactSchema)
      .mutation(async ({ input }) => {
        return await this.contactsService.update(input);
      }),
    removeContact: this.trpc.protectedProcedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/removeContact',
          tags: ['contacts'],
          summary: 'Delete contact'
        }
      })
      .input(z.object({ id: z.string() }))
      .output(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        const id = await this.contactsService.remove(input.id);
        return { id };
      })
  });
}
