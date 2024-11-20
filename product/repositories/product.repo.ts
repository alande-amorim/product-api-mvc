import { Product } from "~domain/entities";
import { DatabaseInterface } from "~infra/database";
import ProductModel from "../models/product.model";

export interface ProductRepositoryInterface {
  create(input: Product): Promise<ProductModel>;
  read(key: ProductModel["uuid"]): Promise<ProductModel>;
  update(key: ProductModel["uuid"]): Promise<ProductModel>;
  delete(key: ProductModel["uuid"]): Promise<Boolean>;
  count(): Promise<Number>;
  list(): Promise<ProductModel[]>;
}

export class ProductRepository implements ProductRepositoryInterface {
  constructor(private db: DatabaseInterface) {}

  async create(input: Product): Promise<ProductModel> {
    return await this.db.create<Product>(input);
  }

  async read(key: ProductModel["uuid"]): Promise<ProductModel> {
    return new ProductModel({
      id: "1",
      uuid: "1",
      name: "Product 1",
      price: 100,
      description: "Description",
      image: "image.jpg",
    });
  }

  async update(key: ProductModel["uuid"]): Promise<ProductModel> {
    return new ProductModel({
      id: "1",
      uuid: "1",
      name: "Product 1",
      price: 100,
      description: "Description",
      image: "image.jpg",
    });
  }

  async delete(key: ProductModel["uuid"]): Promise<Boolean> {
    return true;
  }

  async count(): Promise<Number> {
    return 1;
  }

  async list(): Promise<ProductModel[]> {
    return [
      new ProductModel({
        id: "1",
        uuid: "1",
        name: "Product 1",
        price: 100,
        description: "Description",
        image: "image.jpg",
      }),
    ];
  }
}
