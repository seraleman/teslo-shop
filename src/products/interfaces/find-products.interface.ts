import { Product } from '../schemas/product.schema';

type QueryFields = 'id' | 'title' | 'slug';

export interface FindProducts {
  queriedFields: QueryFields[];
  results: Product[];
}

export interface QueryFindProducts {
  title: RegExp;
  slug: string;
}
