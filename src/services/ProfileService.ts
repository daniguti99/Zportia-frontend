import type { FollowResponse, PostResponse, SimpleUser } from "../interfaces/interfaces";

const URL_BASE = "http://localhost:8080";

export async function getOwnProfile() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/user/profile`, {
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

  const response = await fetch(`${URL_BASE}/user/profile/${id}`, {
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


export async function followUser(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/api/users/${id}/follow`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo seguir al usuario");
  }

  return response.json();
}

export async function unfollowUser(id: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/api/users/${id}/follow`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo dejar de seguir al usuario");
  }

  return response.json();
}

export async function blockUser(id: number): Promise<FollowResponse> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/api/users/${id}/block`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo bloquear al usuario");
  }

  return response.json();
}

export async function unblockUser(id: number): Promise<FollowResponse> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/api/users/${id}/block`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo desbloquear al usuario");
  }

  return response.json();
}



export async function getPostById(postId: number): Promise<PostResponse> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/api/posts/${postId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo cargar la publicación");
  }

  return response.json();
}

export async function getUserPosts(userId: number, page: number = 0, size: number = 12) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/user/${userId}/posts?page=${page}&size=${size}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudieron cargar las publicaciones");
  }

  return response.json();
}

export async function getFollowers(userId: number): Promise<SimpleUser[]> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/user/${userId}/followers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudieron cargar los seguidores");
  }

  return response.json();
}

export async function getFollowing(userId: number): Promise<SimpleUser[]> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/user/${userId}/following`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudieron cargar los usuarios seguidos");
  }

  return response.json();
}


export async function getPendingRequests(): Promise<SimpleUser[]> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/api/me/follow/requests`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudieron cargar las solicitudes de seguimiento");
  }

  return response.json();
}


export async function acceptFollow(userId: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/api/users/${userId}/follow/accept`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo aceptar la solicitud");
  }

  return response.json();
}

export async function rejectFollow(userId: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/api/users/${userId}/follow/request`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo rechazar la solicitud");
  }

  return response.json();
}






