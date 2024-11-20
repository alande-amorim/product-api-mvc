import { api } from "encore.dev/api";

export const create = api(
  { method: "POST", path: "/products", expose: true },
  async () => {}
);
