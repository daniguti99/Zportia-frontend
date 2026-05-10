import type { AdminCommentResponse, SportResponse, UserDetailsAdminDTO } from "../interfaces/interfaces";

const URL_BASE = "https://api-25-26-daniguti99.onrender.com/api/admin";

export async function getUserDetailsAdmin(query: string): Promise<UserDetailsAdminDTO> {
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

export async function adminAction(endpoint: string): Promise<void> {
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



// Obtener post por ID
export async function getPostByIdAdmin(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al obtener el post");
  }

  return await response.json();
}

// Eliminar post
export async function deletePostAdmin(id: number): Promise<void> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Error al eliminar el post");
  }

  return await response.json();
}


export async function getCommentByIdAdmin(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/comments/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    if (errorData?.message) {
      throw new Error(errorData.message);
    }

    throw new Error("Error al obtener el comentario");
  }

  return await response.json();
}


export async function deleteCommentAdmin(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    if (errorData?.message) {
      throw new Error(errorData.message);
    }

    throw new Error("Error al eliminar el comentario");
  }

  return await response.json();
}


export async function createSportAdmin(name: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/sports/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    if (errorData?.message) {
      throw new Error(errorData.message);
    }

    throw new Error("Error al crear el deporte");
  }

  return await response.json(); // SportResponse
}

export async function deleteSportAdmin(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/sports/${id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    if (errorData?.message) {
      throw new Error(errorData.message);
    }

    throw new Error("Error al eliminar el deporte");
  }

  return await response.json();
}

export async function getSportByIdAdmin(id: number): Promise<SportResponse> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/sports/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    if (errorData?.message) {
      throw new Error(errorData.message);
    }

    throw new Error("Error al obtener el deporte");
  }

  return await response.json();
}


