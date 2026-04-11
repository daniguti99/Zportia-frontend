const URL_BASE = "http://localhost:8080/api";

export async function getExplorePosts() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${URL_BASE}/posts/explore`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
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
    const errorText = await response.text();
    throw new Error(errorText);
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
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return await response.json();
}



