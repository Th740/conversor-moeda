import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConversionDocument = HydratedDocument<Conversion>;

@Schema({ timestamps: true })
export class Conversion {
  @Prop({ required: true, type: Number })
  amount!: number;

  @Prop({ required: true, type: String, uppercase: true })
  fromCurrency!: string;

  @Prop({ required: true, type: Number })
  brl!: number;

  @Prop({ required: true, type: Number })
  usd!: number;

  @Prop({ required: true, type: Number })
  eur!: number;
}

export const ConversionSchema = SchemaFactory.createForClass(Conversion);
