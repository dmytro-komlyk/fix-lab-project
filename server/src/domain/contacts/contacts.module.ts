import { Module } from '@nestjs/common';

import { ContactsService } from './contacts.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ContactsService, PrismaService],
})
export class ContactsModule {}
