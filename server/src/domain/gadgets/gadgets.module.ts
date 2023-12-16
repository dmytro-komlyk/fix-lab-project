import { Module } from '@nestjs/common';

import { GadgetsService } from './gadgets.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [GadgetsService, PrismaService],
})
export class GadgetsModule {}
