import { ProductRepositoryInterface } from "../repositories";
import { ServiceInterface } from "./service.interface";
import ProductModel from "../models/product.model";

export type DeleteInput = ProductModel["uuid"];
export type DeleteOutput = Promise<boolean> | boolean;

export class DeleteService
  implements ServiceInterface<DeleteInput, DeleteOutput>
{
  constructor(private repo: ProductRepositoryInterface) {}

  /**
   * Executes the service
   * @todo Implement the method
   * @param uuid key
   * @returns ProductModel
   */
  async execute(key: DeleteInput): Promise<DeleteOutput> {
    return await this.repo.delete(key);
  }
}
