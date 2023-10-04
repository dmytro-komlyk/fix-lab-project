import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument } from 'mongoose';

import { Image } from 'domain/images/schemas/image.schema';

export type BenefitDocument = HydratedDocument<Benefit>;

@Schema({ versionKey: false })
class Benefit extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  readonly _id: string;

  @ApiProperty({ type: Image })
  @Prop({ type: Image })
  readonly icon: Image;

  @ApiProperty({ example: 'Безкоштовна діагностика' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;
}

const BenefitSchema = SchemaFactory.createForClass(Benefit);

export { Benefit, BenefitSchema };
