import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, HydratedDocument, Types } from 'mongoose';

import { Type } from 'class-transformer';

import { Benefit } from 'domain/benefits/schemas/benefit.schema';
import MetadataProps from 'shared/metadata-props.schema';

export type IssueDocument = HydratedDocument<Issue>;

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
class Issue extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
  @Prop({
    type: Types.ObjectId,
    auto: true
  })
  readonly _id: string;

  @ApiProperty({ example: true })
  @Prop({ type: Boolean, default: false })
  readonly isActive: boolean;

  @ApiProperty({ example: 'diagnostic' })
  @Prop({
    type: String,
    unique: true,
    set: (v: string) => v?.trim().toLowerCase(),
    required: true
  })
  readonly slug: string;

  @ApiProperty({ example: 'Diagnostic' })
  @Prop({ type: String, required: true })
  readonly title: string;

  @ApiProperty({ example: 'Так виявляються приховані..' })
  @Prop({ type: String })
  readonly info: string;

  @ApiProperty({
    type: Benefit,
    isArray: true
  })
  @Prop({
    type: [{ type: Types.ObjectId, ref: Benefit.name }]
  })
  @Type(() => Benefit)
  readonly benefits: Array<Benefit>;

  @ApiProperty({ example: 'Так виявляються приховані..' })
  @Prop({ type: String })
  readonly description: string;

  @ApiProperty({ example: 'від 200 грн' })
  @Prop({ type: String, required: true })
  readonly price: string;

  @ApiProperty({ type: Image })
  @Prop({ _id: false, type: Image })
  readonly image: Image;

  @ApiProperty({ type: MetadataProps })
  @Prop({ _id: false, type: MetadataProps })
  readonly metadata: MetadataProps;
}

const IssueSchema = SchemaFactory.createForClass(Issue);

export { Issue, IssueSchema };
