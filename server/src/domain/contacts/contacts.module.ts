import { Module } from '@nestjs/common';

import { ContactsRouter } from './contacts.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { ContactsService } from './contacts.service';

@Module({
  imports: [PrismaModule],
  providers: [ContactsService, ContactsRouter, TrpcService],
  exports: [ContactsService]
})
export class ContactsModule {}
