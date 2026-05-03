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

export async function adminAction(endpoint: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/users/${endpoint}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error en la acción de administrador");
  }

  return await response.json();
}

export const deleteUser = (id: number) => adminAction(`${id}/delete`);
export const blockUser = (id: number) => adminAction(`${id}/block`);
export const activateUser = (id: number) => adminAction(`${id}/activate`);
export const unlockUser = (id: number) => adminAction(`${id}/unlock`);
export const recoverUser = (id: number) => adminAction(`${id}/recover`);
