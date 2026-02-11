// lib/api.ts

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function logout() {
  document.cookie = "token=; path=/; max-age=0";
  document.cookie = "user=; path=/; max-age=0";
  window.location.href = "/login";
}

export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const fullUrl = `${API_BASE_URL}${url}`;

    const res = await fetch(fullUrl, {
      cache: "no-store",
      credentials: "include",
      ...options,
    });

    if (res.status === 401) {
      logout();
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `API request failed: ${res.status} ${res.statusText} - ${text}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("apiFetch error:", error);
    throw error;
  }
}
