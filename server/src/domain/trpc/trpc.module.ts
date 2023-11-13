import { Module } from '@nestjs/common';

import { TrpcRouter } from './trpc.router';

import { ArticlesModule } from '@domain/articles/articles.module';
import { BrandsModule } from '@domain/brands/brands.module';
import { ContactsModule } from '@domain/contacts/contacts.module';
import { GadgetsModule } from '@domain/gadgets/gadgets.module';
import { IssuesModule } from '@domain/issues/issues.module';
import { TrpcService } from './trpc.service';

@Module({
  imports: [
    GadgetsModule,
    BrandsModule,
    ContactsModule,
    IssuesModule,
    ArticlesModule
  ],
  providers: [TrpcService, TrpcRouter]
})
export class TrpcModule {}
