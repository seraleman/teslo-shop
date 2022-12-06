import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../schemas/product.schema';
import { FindProducts } from './find-products.interface';

export interface ProductRepository {
  create(product: CreateProductDto): Promise<Product>;
  deleteById(id: string): Promise<Product>;
  findAll(paginationDto: PaginationDto): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  search(term: string): Promise<FindProducts>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
}
