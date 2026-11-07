import { request } from "./api";

export const categoryService = {
  getAll: () => request("/categories"),
  create: (body) => request("/categories", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) => request(`/categories/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (id) => request(`/categories/${id}`, { method: "DELETE" }),
};