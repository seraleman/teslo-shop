import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ default: 0 })
  price: number;

  @Prop()
  description: string;

  @Prop({ requerided: true, unique: true })
  slug: string;

  @Prop({ default: 0, min: 0 })
  stock: number;

  @Prop()
  sizes: [string];

  @Prop()
  gender: string;

  // tags
  // images
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', function () {
  if (!this.slug) {
    this.slug = this.title;
  }
  this.slug = this.slug.toLowerCase().replaceAll(' ', '_').replaceAll("'", '');
});

// ProductSchema.post()
