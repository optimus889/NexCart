import { apiRequest } from "./client";

export function getAdminAlerts() {
  return apiRequest("/admin/alerts");
}

export function resolveAdminAlert(alertId) {
  return apiRequest(`/admin/alerts/${alertId}/resolve`, {
    method: "PATCH",
  });
}

export function getAdminDashboard() {
  return apiRequest("/admin/dashboard");
}

export function getAdminUsers() {
  return apiRequest("/admin/users");
}

export function getAdminOrders() {
  return apiRequest("/admin/orders");
}

export function getAdminProducts() {
  return apiRequest("/admin/products");
}