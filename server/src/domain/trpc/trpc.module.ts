import { Module } from '@nestjs/common';

import { TrpcRouter } from './trpc.router';

import { TrpcService } from './trpc.service';
import { ArticlesModule } from '@app/domain/articles/articles.module';
import { BrandsModule } from '@app/domain/brands/brands.module';
import { ContactsModule } from '@app/domain/contacts/contacts.module';
import { GadgetsModule } from '@app/domain/gadgets/gadgets.module';
import { IssuesModule } from '@app/domain/issues/issues.module';

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
