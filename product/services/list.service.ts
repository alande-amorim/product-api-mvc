import { ProductRepositoryInterface } from "../repositories";
import { ServiceInterface } from "./service.interface";
import ProductModel from "../models/product.model";

export type ListInput = ProductModel["uuid"];
export type ListOutput = ProductModel[];

export class ListService implements ServiceInterface<ListInput, ListOutput> {
  constructor(private repo: ProductRepositoryInterface) {}

  /**
   * Lists all products
   * @returns ProductModel[]
   */
  async execute(): Promise<ListOutput> {
    return await this.repo.list();
  }
}
