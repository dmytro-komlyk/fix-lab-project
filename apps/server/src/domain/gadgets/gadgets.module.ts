import { Module } from '@nestjs/common';

import { GadgetsRouter } from './gadgets.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { GadgetsService } from './gadgets.service';

@Module({
  imports: [PrismaModule],
  providers: [GadgetsService, GadgetsRouter, TrpcService],
  exports: [GadgetsService]
})
export class GadgetsModule {}
