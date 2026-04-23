import { apiRequest } from "./client";

export function getCustomerOrders() {
  return apiRequest("/customer/orders");
}

export function createCustomerOrder(payload) {
  return apiRequest("/customer/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getCart() {
  return apiRequest("/customer/cart");
}

export function addCartItem(payload) {
  return apiRequest("/customer/cart/items", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateCartItem(productId, payload) {
  return apiRequest(`/customer/cart/items/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function removeCartItem(productId) {
  return apiRequest(`/customer/cart/items/${productId}`, {
    method: "DELETE",
  });
}