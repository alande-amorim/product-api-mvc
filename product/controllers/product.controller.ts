import crypto from "crypto";
import { ProductControllerInterface } from "./controller.interface";

export default class ProductController implements ProductControllerInterface {
  async create({ url }: any) {
    const uuid = crypto.randomUUID();
  }
}
