// Small client for the Express backend (backend/). All requests send the
// login cookie, and failed requests throw an Error with the server's message.

/** Backend URL, e.g. http://localhost:4000 locally or https://api.example.com in production. */
export const API_URL: string = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(
  /\/+$/,
  "",
);

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  /** JSON body. */
  body?: unknown;
  /** multipart/form-data body (file uploads). */
  form?: FormData;
};

export async function api<T = unknown>(
  path: string,
  { method = "GET", body, form }: RequestOptions = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      credentials: "include",
      headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: form ?? (body !== undefined ? JSON.stringify(body) : undefined),
    });
  } catch {
    throw new ApiError(0, "Can't reach the server. Check your connection and try again.");
  }

  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // non-JSON response (e.g. a proxy error page)
  }
  if (!res.ok) {
    const message = (data as { error?: string } | null)?.error;
    throw new ApiError(res.status, message ?? `Request failed (${res.status})`);
  }
  return data as T;
}
