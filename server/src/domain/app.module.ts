import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NotificationsModule } from './notifications/notifications.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { TrpcModule } from './trpc/trpc.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TrpcModule,
    PrismaModule,
    UsersModule,
    NotificationsModule
  ],
  providers: [PrismaService]
})
export class AppModule {}
