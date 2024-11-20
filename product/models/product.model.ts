import { Product } from "~domain/entities";
import { DBModel } from "~infra/database";

export type ProductModelInterface = DBModel<Product>;

export default class ProductModel implements ProductModelInterface {
  public readonly id: string;
  public readonly uuid: string;
  public readonly name: string;
  public readonly price: number;
  public readonly description: string;
  public readonly image: string;

  constructor({
    id,
    uuid,
    name,
    price,
    description,
    image,
  }: ProductModelInterface) {
    this.id = id;
    this.uuid = uuid;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}
