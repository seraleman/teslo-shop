import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import ProductRepositoryMongoDB from './adapters/product-repository-mongo-db';
import {
  Product,
  ProductImage,
  ProductImageSchema,
  ProductSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductImage.name, schema: ProductImageSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepositoryMongoDB],
})
export class ProductsModule {}
