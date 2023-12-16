import { Module } from '@nestjs/common';

import { BenefitsService } from './benefits.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [BenefitsService, PrismaService],
})
export class BenefitsModule {}
