
/**
 * Helper class for making HTTP requests with consistent error handling and JWT authentication
 */

import { BackendError } from "./BackendError";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ResponseType = "json" | "blob" | "text";

export class RequestHelper {
  private baseUrl: string;
  private debug: boolean;

  constructor(baseUrl: string, debug: boolean = false) {
    this.baseUrl = baseUrl;
    this.debug = debug;
  }

  private log(...args: any[]): void {
    if (this.debug) {
      console.log("[RequestHelper]", ...args);
    }
  }

  private getAuthHeader(): { Authorization?: string } {
    const token = localStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Fetch with automatic retry for transient errors
   */
  public async fetchWithRetry(
    url: string, 
    options: RequestInit, 
    maxRetries: number = 2
  ): Promise<Response> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          this.log(`Retry attempt ${attempt} for ${options.method} ${url}`);
          // Exponential backoff
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        const response = await fetch(url, options);
        return response;
      } catch (error) {
        this.log(`Fetch error (attempt ${attempt}):`, error);
        lastError = error instanceof Error ? error : new Error(String(error));
        
        // Only retry on network errors, not HTTP errors (which still return a Response)
        if (attempt >= maxRetries) {
          break;
        }
      }
    }
    
    throw lastError || new Error("Request failed");
  }

  private async handleResponse<T>(
    response: Response,
    requiresAuth: boolean,
    isMultipart: boolean = false,
    responseType: ResponseType = "json"
  ): Promise<T> {
    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
      
      try {
        // Try to parse error message from JSON response
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (e) {
        // If parsing fails, use the default error message
      }

      // If unauthorized and using auth, try to refresh the token
      if (response.status === 401 && requiresAuth) {
        try {
          const refreshed = await this.refreshToken();
          if (refreshed) {
            // Retry the original request with the new token
            this.log("Retrying request with refreshed token");
            // We need the original request info to retry
            return Promise.reject(new BackendError("Token expired, please retry", 401));
          }
        } catch (refreshError) {
          this.log("Failed to refresh token:", refreshError);
        }
      }

      throw new BackendError(errorMessage, response.status);
    }

    if (responseType === "blob") {
      return (await response.blob()) as unknown as T;
    } else if (responseType === "text") {
      return (await response.text()) as unknown as T;
    } else {
      // Check if response is empty
      const text = await response.text();
      return text ? JSON.parse(text) : ({} as T);
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (!response.ok) {
        // If refresh fails, clear tokens and return false
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return false;
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      return true;
    } catch (error) {
      this.log("Token refresh failed:", error);
      return false;
    }
  }

  public async get<T>(
    endpoint: string,
    params: Record<string, any> = {},
    requiresAuth: boolean = false,
    responseType: ResponseType = "json"
  ): Promise<T> {
    // Build query string from params
    const queryString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const url = `${this.baseUrl}${endpoint}${queryString ? `?${queryString}` : ""}`;

    this.log(`GET ${url}`);

    try {
      // Prepare headers
      const headers: Record<string, string> = {
        "Accept": "application/json",
        ...(requiresAuth ? this.getAuthHeader() : {}),
      };

      const response = await this.fetchWithRetry(url, {
        method: "GET",
        headers,
      });

      return this.handleResponse<T>(response, requiresAuth, false, responseType);
    } catch (error) {
      this.log(`GET ${endpoint} failed:`, error);
      throw error instanceof BackendError
        ? error
        : new BackendError(`Request failed: ${(error as Error).message}`);
    }
  }

  public async post<T>(
    endpoint: string,
    data: any = {},
    requiresAuth: boolean = false,
    isMultipart: boolean = false,
    responseType: ResponseType = "json"
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    this.log(`POST ${url}`, data);

    try {
      // Prepare headers based on content type
      let headers: Record<string, string> = {};
      let body: any;

      if (isMultipart) {
        // Don't set Content-Type for multipart/form-data, let the browser set it with boundary
        body = data;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(data);
      }

      // Add auth header if required
      if (requiresAuth) {
        Object.assign(headers, this.getAuthHeader());
      }

      const response = await this.fetchWithRetry(url, {
        method: "POST",
        headers,
        body,
      });

      return this.handleResponse<T>(response, requiresAuth, isMultipart, responseType);
    } catch (error) {
      this.log(`POST ${endpoint} failed:`, error);
      throw error instanceof BackendError
        ? error
        : new BackendError(`Request failed: ${(error as Error).message}`);
    }
  }

  public async put<T>(
    endpoint: string,
    data: any = {},
    requiresAuth: boolean = false,
    responseType: ResponseType = "json"
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    this.log(`PUT ${url}`, data);

    try {
      // Prepare headers
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(requiresAuth ? this.getAuthHeader() : {}),
      };

      const response = await this.fetchWithRetry(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });

      return this.handleResponse<T>(response, requiresAuth, false, responseType);
    } catch (error) {
      this.log(`PUT ${endpoint} failed:`, error);
      throw error instanceof BackendError
        ? error
        : new BackendError(`Request failed: ${(error as Error).message}`);
    }
  }

  public async delete<T>(
    endpoint: string,
    requiresAuth: boolean = false,
    responseType: ResponseType = "json"
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    this.log(`DELETE ${url}`);

    try {
      // Prepare headers
      const headers: Record<string, string> = {
        ...(requiresAuth ? this.getAuthHeader() : {}),
      };

      const response = await this.fetchWithRetry(url, {
        method: "DELETE",
        headers,
      });

      return this.handleResponse<T>(response, requiresAuth, false, responseType);
    } catch (error) {
      this.log(`DELETE ${endpoint} failed:`, error);
      throw error instanceof BackendError
        ? error
        : new BackendError(`Request failed: ${(error as Error).message}`);
    }
  }
}
