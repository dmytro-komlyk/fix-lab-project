import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  Document,
  HydratedDocument,
  Schema as MongooseSchema,
  Types
} from 'mongoose';

import { Benefit } from 'domain/benefits/schemas/benefit.schema';
import { Image } from 'domain/images/schemas/image.schema';
import MetadataProps from 'shared/metadata-props.schema';

export type IssueDocument = HydratedDocument<Issue>;

@Schema({ versionKey: false })
class Issue extends Document {
  @ApiProperty({ example: '64ef4383e46e72721c03090e' })
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
  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: Benefit.name
    }
  ])
  readonly benefits: [Benefit];

  @ApiProperty({ example: 'Так виявляються приховані..' })
  @Prop({ type: String })
  readonly description: string;

  @ApiProperty({ example: 'від 200 грн' })
  @Prop({ type: String, required: true })
  readonly price: string;

  @ApiProperty({
    type: Image
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Image.name
  })
  readonly image: Types.ObjectId;

  @ApiProperty({ type: MetadataProps })
  @Prop({ _id: false, type: MetadataProps })
  readonly metadata: MetadataProps;
}

const IssueSchema = SchemaFactory.createForClass(Issue);

export { Issue, IssueSchema };
