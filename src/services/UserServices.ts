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


export async function updateUserSports(userId: number, sports: number[]) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/profile/${userId}/sports`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ sports })
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    throw new Error(errorJson?.message || "Error al actualizar los deportes");
  }

  return await response.json();
}