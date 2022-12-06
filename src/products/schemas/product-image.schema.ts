import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type ProductImageDocument = HydratedDocument<ProductImage>;

@Schema()
export class ProductImage {
  @Prop({ required: true })
  url: string;
}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);
