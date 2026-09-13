const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
};

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const isFormData = body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: isFormData
      ? headers
      : {
          "Content-Type": "application/json",
          ...headers,
        },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";

  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    let message = "Request failed";

    if (data && typeof data === "object" && "message" in data) {
      message = String((data as { message?: string }).message || message);
    }

    throw new Error(message);
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint),
  post: <T>(endpoint: string, body?: Record<string, unknown>) =>
    apiRequest<T>(endpoint, { method: "POST", body }),
  put: <T>(endpoint: string, body?: Record<string, unknown>) =>
    apiRequest<T>(endpoint, { method: "PUT", body }),
  patch: <T>(endpoint: string, body?: Record<string, unknown>) =>
    apiRequest<T>(endpoint, { method: "PATCH", body }),
  del: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: "DELETE" }),
};
