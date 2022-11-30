import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MongoProductsRepository } from './utils/Mongo-products-repository';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductService');
  constructor(private readonly productRepository: MongoProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.create(createProductDto);
    } catch (error) {
      this.handlerDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private handlerDBExceptions(error: any) {
    // if (error.code === 11000) throw new BadRequestException(error.detail);
    console.log(error);
    this.logger.error(error);
    this.logger.error(`Error code: ${error.code}`);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
