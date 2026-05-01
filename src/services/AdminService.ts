const URL_BASE = "http://localhost:8080/api/admin";

export async function getUserDetailsAdmin(query: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${URL_BASE}/users/search?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudieron obtener los detalles del usuario");
  }

  return await response.json(); // devuelve UserDetailsAdminDTO
}
