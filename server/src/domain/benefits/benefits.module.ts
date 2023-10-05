import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BenefitsController } from './benefits.controller';
import { BenefitsService } from './benefits.service';
import { ImagesModule } from 'domain/images/images.module';

import { Benefit, BenefitSchema } from './schemas/benefit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Benefit.name, schema: BenefitSchema }]),
    ImagesModule
  ],
  controllers: [BenefitsController],
  providers: [BenefitsService],
  exports: [BenefitsService]
})
export class BenefitsModule {}
