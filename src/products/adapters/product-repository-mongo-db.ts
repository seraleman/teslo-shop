import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreateProductDto } from '../dto/create-product.dto';
import { FindProducts } from '../interfaces/find-products.interface';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Product, ProductDocument } from '../schemas/product.schema';
import { ProductRepository } from '../interfaces/products-repository.interface';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export default class ProductRepositoryMongoDB implements ProductRepository {
  private validateObjecId = isValidObjectId;

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new this.productModel(createProductDto);
    return await product.save();
  }

  async deleteById(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }

  async findAll(paginationDto: PaginationDto): Promise<Product[]> {
    const { offset = 1, limit = 10 } = paginationDto;
    return await this.productModel.find().skip(offset).limit(limit);
  }

  async findById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async search(term: string): Promise<FindProducts> {
    let product: Product;
    if (this.validateObjecId(term)) {
      product = await this.productModel.findById(term);
      return {
        queriedFields: ['id'],
        results: product ? [product] : [],
      };
    }

    const regex = new RegExp(term, 'i');
    const products = await this.productModel.find({
      $or: [{ title: regex }, { slug: term }],
    });

    return {
      queriedFields: ['title', 'slug'],
      results: products,
    };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }
}
