import { Module } from '@nestjs/common';

import { ImagesRouter } from './images.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { ImagesService } from './images.service';

@Module({
  imports: [PrismaModule],
  providers: [ImagesService, ImagesRouter, TrpcService],
  exports: [ImagesService]
})
export class ImagesModule {}
