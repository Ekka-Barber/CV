const API_BASE = "/api";

async function fetchApi<T>(
  path: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      credentials: "include",
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { error: (json as { message?: string }).message ?? res.statusText };
    }
    return { data: json as T };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Network error" };
  }
}

export const authApi = {
  signIn: (email: string, password: string) =>
    fetchApi<{ user: unknown }>("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  signUp: (email: string, password: string) =>
    fetchApi<{ user: unknown }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  signOut: () => fetchApi("/auth/signout", { method: "POST" }),
  me: () => fetchApi<{ user: unknown }>("/auth/me"),
};

export const resumesApi = {
  list: () => fetchApi<{ resumes: unknown[] }>("/resumes"),
  get: (id: string) => fetchApi<unknown>(`/resumes/${id}`),
  create: (body: unknown) =>
    fetchApi<{ id: string }>("/resumes", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  update: (id: string, body: unknown) =>
    fetchApi(`/resumes/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: (id: string) =>
    fetchApi(`/resumes/${id}`, { method: "DELETE" }),
  duplicate: (id: string) =>
    fetchApi<{ id: string }>(`/resumes/${id}/duplicate`, {
      method: "POST",
    }),
};

export const exportApi = {
  pdf: (resumeId: string, templateKey: string, languageMode: string) =>
    fetch(`${API_BASE}/export/pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ resumeId, templateKey, languageMode }),
    }),
  docx: (resumeId: string, templateKey: string, languageMode: string) =>
    fetch(`${API_BASE}/export/docx`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ resumeId, templateKey, languageMode }),
    }),
};
