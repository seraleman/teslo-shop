import { CreateProductDto } from '../dto/create-product.dto';
import { Product } from '../schemas/product.schema';

export const PRODUCT_REPOSITORY = 'ProductRepository';

export interface ProductRepository {
  create(product: CreateProductDto): Promise<Product>;
}
