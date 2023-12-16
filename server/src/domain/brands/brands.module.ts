import { Module } from '@nestjs/common';

import { BrandsService } from './brands.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [BrandsService, PrismaService],
})
export class BrandsModule {}
