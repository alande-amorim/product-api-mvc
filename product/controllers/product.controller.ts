import ProductModel, { ProductModelInterface } from "../models/product.model";
import { CreateService } from "../services";
import { Container } from "../container";
import { Product } from "~domain/entities";
import { ReadService } from "../services/read.service";
import { UpdateService } from "../services/update.service";
import { PatchService } from "../services/patch.service";
import { DeleteService } from "../services/delete.service";
import { CountService } from "../services/count.service";
import { ListService } from "../services/list.service";
import { SearchService } from "../services/search.service";

export type CreateInput = {
  name: string;
  price: number;
  sku: string;
  description?: string;
  image?: string;
};
export type UpdateInput = { uuid: string } & Product;
export type PatchInput = { uuid: string } & Partial<Product>;
export type SearchInput = { query: string };
export type DeleteInput = { uuid: string };
export type ReadInput = { uuid: string };

export interface ProductControllerInterface {
  create(input: CreateInput): Promise<ProductModel>;
  read({ uuid }: { uuid: string }): Promise<ProductModel | null>;
  list(): Promise<ProductModel[]>;
  count(): Promise<number>;
  update(input: UpdateInput): Promise<ProductModel>;
  patch(input: PatchInput): Promise<ProductModel>;
  delete({ uuid }: { uuid: string }): Promise<boolean>;
  searchByName({ query }: { query: string }): Promise<ProductModel[]>;
}

export default class ProductController implements ProductControllerInterface {
  async create(input: CreateInput): Promise<ProductModelInterface> {
    const service = Container.resolve<CreateService>("createProductService");
    const response = await service.execute(input);
    console.log(response);
    return response;
  }

  async read({ uuid }: ReadInput): Promise<ProductModelInterface> {
    const service = Container.resolve<ReadService>("readProductService");
    return await service.execute(uuid);
  }

  async list(): Promise<ProductModel[]> {
    const service = Container.resolve<ListService>("listProductService");
    return await service.execute();
  }

  async count(): Promise<number> {
    const service = Container.resolve<CountService>("countProductService");
    return await service.execute();
  }

  async update({ uuid, ...input }: UpdateInput): Promise<ProductModel> {
    const service = Container.resolve<UpdateService>("updateProductService");
    return await service.execute(uuid, input);
  }

  async patch({ uuid, ...input }: PatchInput): Promise<ProductModel> {
    const service = Container.resolve<PatchService>("patchProductService");
    return await service.execute(uuid, input);
  }

  async delete({ uuid }: DeleteInput): Promise<boolean> {
    const service = Container.resolve<DeleteService>("deleteProductService");
    return await service.execute(uuid);
  }

  async searchByName({ query }: SearchInput): Promise<ProductModel[]> {
    const service = Container.resolve<SearchService>("searchProductService");
    return await service.execute("name", query);
  }
}
