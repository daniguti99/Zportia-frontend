const URL_BASE = "http://localhost:8080/user";

export async function getOwnProfile() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo cargar tu perfil");
  }

  return response.json();
}


export async function getProfileById(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/profile/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo cargar el perfil solicitado");
  }

  return response.json();
}
