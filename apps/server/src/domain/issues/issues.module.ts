import { Module } from '@nestjs/common';

import { ImagesRouter } from '../images/images.router';

import { PrismaModule } from '../prisma/prisma.module';
import { TrpcService } from '../trpc/trpc.service';
import { IssuesService } from './issues.service';

@Module({
  imports: [PrismaModule],
  providers: [IssuesService, ImagesRouter, TrpcService],
  exports: [IssuesService]
})
export class IssuesModule {}
