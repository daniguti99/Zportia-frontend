const URL_BASE = "http://localhost:8080/user";

export async function getAllUsers() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/minimal`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);
    throw new Error("No se pudieron cargar los usuarios");
  }

  return response.json();
}


