const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 204) return null;

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401) localStorage.removeItem("token");
    throw new Error(body.erreur || body.message || "Erreur inattendue");
  }

  return body.data;
}

export function login(username, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function register(username, password) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function getEtudiants() {
  return request("/etudiants");
}

export function createEtudiant(data) {
  return request("/etudiants", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateEtudiant(id, data) {
  return request(`/etudiants/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteEtudiant(id) {
  return request(`/etudiants/${id}`, { method: "DELETE" });
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function logout() {
  localStorage.removeItem("token");
}
