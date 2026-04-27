const URL_BASE = "http://localhost:8080/api";

export async function getExplorePosts() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/explore`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    // Intentar obtener mensaje del backend
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) {
      throw new Error(errorJson.message);
    }
    if (errorJson?.error) {
      throw new Error(errorJson.error);
    }

    throw new Error("No se pudieron cargar los posts");
  }

  return await response.json();
}

export async function getCommentsByPost(postId: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) {
      throw new Error(errorJson.message);
    }
    if (errorJson?.error) {
      throw new Error(errorJson.error);
    }

    throw new Error("No se pudieron cargar los comentarios");
  }

  return await response.json();
}


export async function getLikesByPost(postId: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/${postId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) {
      throw new Error(errorJson.message);
    }
    if (errorJson?.error) {
      throw new Error(errorJson.error);
    }

    throw new Error("No se pudieron cargar los likes");
  }

  return await response.json();
}


export async function getFriendsPosts() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/friends`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) {
      throw new Error(errorJson.message);
    }
    if (errorJson?.error) {
      throw new Error(errorJson.error);
    }

    throw new Error("No se pudieron cargar las publicaciones de amigos");
  }

  return await response.json();
}


export async function toggleLike(postId: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) {
      throw new Error(errorJson.message);
    }
    if (errorJson?.error) {
      throw new Error(errorJson.error);
    }

    throw new Error("No se pudo procesar la acción");
  }

  return await response.json();
}

export async function createComment(postId: number, text: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo crear el comentario");
  }

  return await response.json();
}

export async function deleteComment(commentId: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo eliminar el comentario");
  }
}



export async function createPost(content: string | null,file: File,location: string | null) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  if (content) formData.append("content", content);
  if (location) formData.append("location", location);
  formData.append("file", file);

  const response = await fetch(`${URL_BASE}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo crear la publicación");
  }

  return response.json();
}


export async function deletePost(postId: number) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo eliminar la publicación");
  }

  return response.text();
}


