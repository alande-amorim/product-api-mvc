import { api } from "encore.dev/api";
import { Container } from "./container";
import "./bootstrap";
import ProductController, {
  UpdateInput,
  PatchInput,
  SearchInput,
  DeleteInput,
  ReadInput,
  CreateInput,
} from "./controllers/product.controller";
import ProductModel, { ProductModelInterface } from "./models/product.model";

const controller = Container.resolve<ProductController>("productController");

export const create = api<CreateInput, Promise<ProductModelInterface>>(
  { method: "POST", path: "/api/products", expose: true },
  controller.create
);

export const read = api<ReadInput, Promise<ProductModelInterface>>(
  {
    method: "GET",
    path: "/api/products/:uuid",
    expose: true,
  },
  controller.read
);

export const list = api<void>(
  {
    method: "GET",
    path: "/api/products",
    expose: true,
  },
  controller.list
);

export const count = api<void>(
  {
    method: "GET",
    path: "/api/products/count",
    expose: true,
  },
  controller.count
);

export const update = api<UpdateInput, Promise<ProductModelInterface>>(
  {
    method: "PUT",
    path: "/api/products/:uuid",
    expose: true,
  },
  controller.update
);

export const patch = api<PatchInput, Promise<ProductModelInterface>>(
  {
    method: "PATCH",
    path: "/api/products/:uuid",
    expose: true,
  },
  controller.patch
);

export const deleteEndpoint = api<DeleteInput>(
  {
    method: "DELETE",
    path: "/api/products/:uuid",
    expose: true,
  },
  controller.delete
);

export const searchByName = api<SearchInput>(
  {
    method: "GET",
    path: "/api/products/searchByName/:query",
    expose: true,
  },
  controller.searchByName
);
