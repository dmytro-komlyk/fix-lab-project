import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';

export type BenefitDocument = HydratedDocument<Benefit>;

export class Image {
  @ApiProperty({
    example: '/public/image_path'
  })
  @Prop({ type: String })
  readonly src: string;

  @ApiProperty({
    example: 'Alt image'
  })
  @Prop({ type: String })
  readonly alt: string;

  @ApiProperty({
    example: 20
  })
  @Prop({ type: Number })
  readonly width: number;

  @ApiProperty({
    example: 20
  })
  @Prop({ type: Number })
  readonly height: number;
}

@Schema({ versionKey: false })
class Benefit extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Prop({
    type: Types.ObjectId,
    auto: true
  })
  readonly _id: string;

  @ApiProperty({ type: Image })
  @Prop({ _id: false, type: Image })
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
