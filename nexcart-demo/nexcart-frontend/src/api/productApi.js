import { apiRequest } from "./client";

export function getProducts() {
  return apiRequest("/products");
}