import { request } from "./api";

export const statsService = {
  get: () => request("/stats"),
};