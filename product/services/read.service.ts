import { ProductRepositoryInterface } from "../repositories";
import { ServiceInterface } from "./service.interface";
import ProductModel from "../models/product.model";

export type ReadInput = ProductModel["uuid"];
export type ReadOutput = ProductModel;

export class ReadService implements ServiceInterface<ReadInput, ReadOutput> {
  constructor(private repo: ProductRepositoryInterface) {}

  /**
   * Retrieves a product by its uuid. If the product is not found, it returns null.
   * @param uuid key
   * @returns ProductModel | null
   */
  async execute(key: ReadInput): Promise<ReadOutput> {
    const product = await this.repo.read(key);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }
}
