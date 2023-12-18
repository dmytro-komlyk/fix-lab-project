import { Module } from '@nestjs/common';

import { BrandsRouter } from './brands.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { BrandsService } from './brands.service';

@Module({
  imports: [PrismaModule],
  providers: [BrandsService, BrandsRouter, TrpcService],
  exports: [BrandsService]
})
export class BrandsModule {}
