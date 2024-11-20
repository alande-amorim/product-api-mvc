import { Product } from "~domain/entities";
import { ProductRepositoryInterface } from "../repositories";
import { ServiceInterface } from "./service.interface";
import ProductModel from "../models/product.model";

export type CreateInput = {
  name: string;
  price: number;
  sku: string;
  description?: string;
  image?: string;
};
export type CreateOutput = ProductModel;

export class CreateService
  implements ServiceInterface<CreateInput, CreateOutput>
{
  constructor(private repo: ProductRepositoryInterface) {}

  private async validate(input: CreateInput): Promise<void> {
    if (!input.name) {
      throw new Error("Product name is required");
    }

    if (!input.price) {
      throw new Error("Product price is required");
    }

    if (!input.sku) {
      throw new Error("Product SKU is required");
    }
  }

  /**
   * Validates the input and invokes the repository to create a new product
   * @param CreateInput input
   * @returns CreateOutput
   * @throws Error
   */
  async execute(input: CreateInput): Promise<CreateOutput> {
    await this.validate(input);
    const response = await this.repo.create(input);
    console.log(response);
    return response;
  }
}
