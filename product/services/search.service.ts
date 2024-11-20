import { ProductRepositoryInterface } from "../repositories";
import ProductModel from "../models/product.model";

export type SearchField = keyof ProductModel;
export type SearchQuery = unknown;
export type SearchOutput = ProductModel[];

export class SearchService {
  constructor(private repo: ProductRepositoryInterface) {}

  /**
   * Searches for a product by a field and query
   * @param string field - the product field to be searched
   * @param unknown query - the product data to search the field for
   * @returns ProductModel[]
   */
  async execute(field: SearchField, query: SearchQuery): Promise<SearchOutput> {
    return await this.repo.search(field, query);
  }
}
