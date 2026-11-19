const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function request(path, options = {}) {
  const token = localStorage.getItem("codearena_token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed.");
  return data;
}

export async function signIn(email, password) {
  const data = await request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  localStorage.setItem("codearena_token", data.token);
  return data.user;
}
export async function signUp(name, email, password) {
  const data = await request("/api/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
  localStorage.setItem("codearena_token", data.token);
  return data.user;
}
export function signOut() { localStorage.removeItem("codearena_token"); }