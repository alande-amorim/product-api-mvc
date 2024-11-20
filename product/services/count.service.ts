import { ProductRepositoryInterface } from "../repositories";
import { ServiceInterface } from "./service.interface";

export type CountOutput = number;

export class CountService implements ServiceInterface<void, CountOutput> {
  constructor(private repo: ProductRepositoryInterface) {}

  /**
   * Counts the number of products
   * @returns number
   */
  async execute(): Promise<CountOutput> {
    return await this.repo.count();
  }
}
