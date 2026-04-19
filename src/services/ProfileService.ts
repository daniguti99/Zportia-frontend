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


export async function getPostById(postId: number) {
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

  const response = await fetch(`${URL_BASE}/users/${userId}/posts?page=${page}&size=${size}`, {
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



