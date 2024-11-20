import { Product } from "~domain/entities";
import { DBModel } from "~infra/database";

export type ProductModelInterface = DBModel<Product>;

export default class ProductModel implements ProductModelInterface {
  public readonly id: number;
  public readonly uuid: string;
  public readonly name: string;
  public readonly price: number;
  public readonly description: string;
  public readonly image: string;
  public readonly sku: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date | null;

  constructor({
    id,
    uuid,
    name,
    price,
    description,
    image,
    sku,
    createdAt,
    updatedAt,
  }: ProductModelInterface) {
    this.id = id;
    this.uuid = uuid;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.sku = sku;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
