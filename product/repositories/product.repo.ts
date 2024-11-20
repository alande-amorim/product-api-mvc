import { Product } from "~domain/entities";
import { DatabaseInterface } from "~infra/database";
import ProductModel from "../models/product.model";

export interface ProductRepositoryInterface {
  create(input: Partial<Product>): Promise<ProductModel>;
  read(key: ProductModel["uuid"]): Promise<ProductModel>;
  update(key: ProductModel["uuid"], data: Product): Promise<ProductModel>;
  delete(key: ProductModel["uuid"]): Promise<boolean>;
  count(): Promise<number>;
  list(): Promise<ProductModel[]>;
  search(field: keyof ProductModel, value: unknown): Promise<ProductModel[]>;
}

export class ProductRepository implements ProductRepositoryInterface {
  constructor(private readonly db: DatabaseInterface) {}

  async create(input: Product): Promise<ProductModel> {
    return await this.db.create<Product>(input);
  }

  async read(key: ProductModel["uuid"]): Promise<ProductModel> {
    return await this.db.read<Product>(key);
  }

  async update(
    key: ProductModel["uuid"],
    data: Product
  ): Promise<ProductModel> {
    return this.db.update<Product>(key, data);
  }

  async delete(key: ProductModel["uuid"]): Promise<boolean> {
    return this.db.delete(key);
  }

  async count(): Promise<number> {
    return this.db.count();
  }

  async list(): Promise<ProductModel[]> {
    return this.db.list<Product>();
  }

  async search(
    field: keyof ProductModel,
    value: unknown
  ): Promise<ProductModel[]> {
    return this.db.search<ProductModel>(field, value);
  }
}
