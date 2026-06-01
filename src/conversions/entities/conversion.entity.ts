import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversionDocument = Conversion & Document;

@Schema()
export class Conversion {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  fromCurrency: string;

  @Prop({ required: true })
  usd: number;

  @Prop({ required: true })
  eur: number;
}

export const ConversionSchema = SchemaFactory.createForClass(Conversion);