import { getToken } from "@/utils/token";

export const API_BASE =
  import.meta.env.VITE_USE_AWS_API_GATEWAY === "true"
    ? import.meta.env.VITE_AWS_API_GATEWAY_URL
    : import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

export async function apiRequest(path, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}