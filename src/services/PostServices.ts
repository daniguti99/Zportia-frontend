const URL_BASE = "http://localhost:8080/api/posts";

// services/PostService.ts
export async function getExplorePosts() {
  const res = await fetch(`${URL_BASE}/explore`);
  if (!res.ok) throw new Error("Error al cargar publicaciones");
  return res.json();
}