import { Product } from "~domain/entities";
import { ProductRepositoryInterface } from "../repositories";
import ProductModel from "../models/product.model";

export type PatchKey = ProductModel["uuid"];
export type PatchInput = Partial<Product>;
export type PatchOutput = ProductModel;

export class PatchService {
  constructor(private repo: ProductRepositoryInterface) {}

  /**
   * Patches a product. If the product does not exist, throws an error.
   * @param string key - the product uuid
   * @param data - the product data to be patched
   * @returns ProductModel
   */
  async execute(key: PatchKey, data: PatchInput): Promise<PatchOutput> {
    const product = await this.repo.read(key);
    if (!product) {
      throw new Error("Product not found");
    }

    return await this.repo.update(key, {
      ...product,
      ...data,
    });
  }
}
