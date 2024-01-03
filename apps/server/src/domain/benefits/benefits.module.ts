import { Module } from '@nestjs/common';

import { BenefitsRouter } from './benefits.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { BenefitsService } from './benefits.service';

@Module({
  imports: [PrismaModule],
  providers: [BenefitsService, BenefitsRouter, TrpcService],
  exports: [BenefitsService]
})
export class BenefitsModule {}
