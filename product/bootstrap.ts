import { Database } from "~infra/database";
import { ProductRepository } from "./repositories";
import {
  CreateService,
  ListService,
  PatchService,
  ReadService,
  SearchService,
  UpdateService,
} from "./services";
import { Container } from "./container";
import ProductController from "./controllers/product.controller";

function initialize() {
  Container.register("database", Database.getInstance());
  Container.register(
    "productRepository",
    new ProductRepository(Container.resolve("database"))
  );
  Container.register(
    "createProductService",
    new CreateService(Container.resolve("productRepository"))
  );

  Container.register(
    "listProductService",
    new ListService(Container.resolve("productRepository"))
  );

  Container.register(
    "patchProductService",
    new PatchService(Container.resolve("productRepository"))
  );

  Container.register(
    "readProductService",
    new ReadService(Container.resolve("productRepository"))
  );

  Container.register(
    "searchProductService",
    new SearchService(Container.resolve("productRepository"))
  );

  Container.register(
    "updateProductService",
    new UpdateService(Container.resolve("productRepository"))
  );

  Container.register("productController", new ProductController());
  console.log("Product module initialized");
}

initialize();
