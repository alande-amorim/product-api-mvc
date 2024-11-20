import { Product } from "@/models/product";

export type CreateInput = {};

export interface ProductControllerInterface {
  create(input: CreateInput): Promise<Product>;
  read(key: string): Promise<Product>;
  update(key: string, input: CreateInput): Promise<Product>;
  delete(key: string): Promise<boolean>;
  count(): Promise<number>;
  list(): Promise<Product[]>;
  findByName(name: string): Promise<Product[]>;
}
