import { request } from "./api";

export const productService = {
  getAll: () => request("/products"),
  create: (body) => request("/products", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (id) => request(`/products/${id}`, { method: "DELETE" }),
};