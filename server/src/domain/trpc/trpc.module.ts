import { Module } from '@nestjs/common';

import { TrpcRouter } from './trpc.router';

import { ArticlesService } from '../articles/articles.service';
import { BenefitsService } from '../benefits/benefits.service';
import { BrandsService } from '../brands/brands.service';
import { ContactsService } from '../contacts/contacts.service';
import { IssuesService } from '../issues/issues.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from './trpc.service';
import { GadgetsService } from '@domain/gadgets/gadgets.service';

@Module({
  imports: [PrismaModule],
  providers: [
    TrpcService,
    TrpcRouter,
    GadgetsService,
    IssuesService,
    BenefitsService,
    BrandsService,
    ArticlesService,
    ContactsService
  ]
})
export class TrpcModule {}
