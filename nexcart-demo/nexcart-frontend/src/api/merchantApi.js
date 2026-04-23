import { apiRequest } from "./client";

export function getMerchantWallet() {
  return apiRequest("/merchant/wallet");
}

export function withdrawMerchantFunds(payload) {
  return apiRequest("/merchant/wallet/withdraw", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function receiveMerchantPayment(payload) {
  return apiRequest("/merchant/wallet/receive", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function toggleMerchantProduct(productId) {
  return apiRequest(`/merchant/products/${productId}/toggle`, {
    method: "PATCH",
  });
}

export function getMerchantOrders() {
  return apiRequest("/merchant/orders");
}

export function updateMerchantOrderStatus(orderId, payload) {
  return apiRequest(`/merchant/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}