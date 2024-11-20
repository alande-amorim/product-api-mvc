import { Product } from "~domain/entities";
import { ProductRepositoryInterface } from "../repositories";
import ProductModel from "../models/product.model";

export type UpdateKey = ProductModel["uuid"];
export type UpdateInput = Product;
export type UpdateOutput = ProductModel;

export class UpdateService {
  constructor(private repo: ProductRepositoryInterface) {}

  private async validate(data: UpdateInput): Promise<void> {
    if (!data.name) {
      throw new Error("Name is required");
    }

    if (!data.price) {
      throw new Error("Price is required");
    }

    if (data.price <= 0) {
      throw new Error("Price must be greater than 0");
    }

    if (!data.sku) {
      throw new Error("SKU is required");
    }
  }

  /**
   * Finds a product by its uuid and updates it. If the product is not found, an error is thrown.
   *
   * @param string key - the product uuid
   * @param data - the product data to be updated
   * @returns ProductModel
   * @throws Error
   */
  async execute(key: UpdateKey, data: UpdateInput): Promise<UpdateOutput> {
    const product = await this.repo.read(key);
    if (!product) {
      throw new Error("Product not found");
    }

    this.validate(data);

    return await this.repo.update(key, data);
  }
}
