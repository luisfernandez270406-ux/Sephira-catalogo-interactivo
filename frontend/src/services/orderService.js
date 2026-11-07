import { request } from "./api";

export const orderService = {
  getAll: () => request("/orders"),
  create: (body) => request("/orders", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) => request(`/orders/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (id) => request(`/orders/${id}`, { method: "DELETE" }),
};