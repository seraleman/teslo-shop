import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductRepositoryMongoDB from './adapters/product-repository-mongo-db';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductService');
  constructor(private readonly productRepository: ProductRepositoryMongoDB) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.create(createProductDto);
    } catch (error) {
      this.handlerDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      return await this.productRepository.findAll(paginationDto);
    } catch (error) {
      this.handlerDBExceptions(error);
    }
  }

  async search(term: string) {
    try {
      return await this.productRepository.search(term);
    } catch (error) {
      this.handlerDBExceptions(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let product: Product;
    try {
      product = await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      this.handlerDBExceptions(error);
    }
    if (!product)
      throw new NotFoundException(`Product with id '${id}' not found`);
    return product;
  }

  async remove(id: string) {
    const product = await this.productRepository.deleteById(id);
    if (!product)
      throw new NotFoundException(`Product with id '${id}' not found`);
    return product;
  }

  private handlerDBExceptions(error: any) {
    if (error.code === 11000) {
      this.logger.error(`Error code: ${error.code}`);
      console.log(error);
      this.logger.error(error);
      throw new BadRequestException(
        `There is already a product with title '${error.keyValue.slug}'`,
        {
          cause: new Error(),
          description: error,
        },
      );
    }
    this.logger.error(`Error code: ${error.code}`);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
