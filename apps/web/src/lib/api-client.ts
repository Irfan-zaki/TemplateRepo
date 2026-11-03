export class ApiError extends Error {
  public status: number;
  public data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

function formatUrl(endpoint: string): string {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }
  const cleanBase = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${cleanBase}${cleanEndpoint}`;
}

export const apiClient = {
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = formatUrl(endpoint);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      },
      ...options
    });

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
      throw new ApiError(response.status, `Request to ${endpoint} failed with status ${response.status}`, errorBody);
    }

    return response.json() as Promise<T>;
  },

  async post<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> {
    const url = formatUrl(endpoint);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options
    });

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
      throw new ApiError(response.status, `POST request to ${endpoint} failed with status ${response.status}`, errorBody);
    }

    return response.json() as Promise<T>;
  },

  async put<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> {
    const url = formatUrl(endpoint);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options
    });

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
      throw new ApiError(response.status, `PUT request to ${endpoint} failed with status ${response.status}`, errorBody);
    }

    return response.json() as Promise<T>;
  },

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = formatUrl(endpoint);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      },
      ...options
    });

    if (!response.ok) {
      let errorBody: unknown;
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text();
      }
      throw new ApiError(response.status, `DELETE request to ${endpoint} failed with status ${response.status}`, errorBody);
    }

    return response.json() as Promise<T>;
  }
};

