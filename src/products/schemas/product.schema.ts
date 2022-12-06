import { DateTime } from 'luxon';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { clean } from 'src/common/helpers/string-clean';
import { ProductImage } from './product-image.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ default: DateTime.now() })
  createdAt: Date;

  @Prop()
  description: string;

  @Prop()
  gender: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductImage' }],
    default: [],
  })
  images: ProductImage[];

  @Prop({ default: 0 })
  price: number;

  @Prop()
  sizes: [string];

  @Prop({ required: true, unique: true, index: true })
  title: string;

  @Prop({ requerided: true, unique: true, index: true }) // unique no trabaja sin index
  slug: string;

  @Prop({ default: 0, min: 0 })
  stock: number;

  @Prop({ default: [] })
  tags: [string];

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('findOneAndUpdate', async function () {
  this.set({ updatedAt: DateTime.now() }).set({
    slug: clean(this.getUpdate()['title']),
  });
});

ProductSchema.pre('save', function () {
  this.slug = this.title.toLowerCase().replaceAll(' ', '_').replaceAll("'", '');
});

ProductSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, __v, ...product } = this.toObject();

  product.id = _id;

  return product;
};
