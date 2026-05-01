const URL_BASE = "http://localhost:8080/api";

export async function getExplorePosts(page = 0, size = 10) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${URL_BASE}/posts/explore?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudieron cargar los posts");
  }

  const data = await response.json();
  return data;
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


export async function getFriendsPosts(page = 0, size = 10) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${URL_BASE}/posts/friends?page=${page}&size=${size}`,
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



export async function createPost(content: string | null,file: File,location: string | null, sport: string) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  if (content) formData.append("content", content);
  if (location) formData.append("location", location);
  formData.append("file", file);
  formData.append("sport", sport);

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


export async function updatePost(postId: number, data: {
  content: string | null;
  location: string | null;
  sport: string | null;
}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/edit/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);

    if (errorJson?.message) throw new Error(errorJson.message);
    if (errorJson?.error) throw new Error(errorJson.error);

    throw new Error("No se pudo actualizar la publicación");
  }

  return await response.json();
}
