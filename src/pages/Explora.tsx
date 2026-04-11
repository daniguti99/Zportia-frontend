// pages/Explore.tsx
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import type { PostResponse } from "../interfaces/interfaces";
import { getExplorePosts } from "../services/PostServices";
import "../css/explore/explore.css";


export default function Explore() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getExplorePosts();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || "No se pudieron cargar las publicaciones 😔");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return <p className="explore-loading">Explorando...</p>;
  }

  if (error) {
    return <p className="explore-error">{error}</p>;
  }

  return (
    <div className="explore-container">
      <h1 className="explore-title">Explorar</h1>

      <div className="explore-feed">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>No hay publicaciones disponibles</p>
        )}
      </div>
    </div>
  );
}