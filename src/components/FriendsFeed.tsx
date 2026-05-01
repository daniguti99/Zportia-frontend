import { useEffect, useState } from "react";
import { getFriendsPosts } from "../services/PostServices";
import PostCard from "./PostCard";
import { useAuth } from "../hooks/useAuth";
import type { PostResponse } from "../interfaces/interfaces";
import "../css/home/friendsFeed.css";

export default function FriendsFeed() {
  const { user: currentUser } = useAuth();

  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Cargar primera página
  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const data = await getFriendsPosts(0, 10);

      setPosts(data?.content ?? []);
      setPage(1);
      setHasMore(!data?.last);

    } catch (err: any) {
      setError(err.message || "No se pudieron cargar las publicaciones 😔");
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    try {
      if (loadingMore) return;

      setLoadingMore(true);

      const data = await getFriendsPosts(page, 10);

      setPosts(prev => [...prev, ...(data?.content ?? [])]);

      if (data?.last) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }

    } catch (err: any) {
      setError(err.message || "No se pudieron cargar más publicaciones 😔");
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading && posts.length === 0)
    return <p className="friends-feed-loading">Cargando publicaciones...</p>;

  if (error)
    return <p className="friends-feed-error">{error}</p>;

  return (
    <div className="friends-feed-container">
      <h1 className="friends-feed-title">Publicaciones de tus amigos</h1>

      <div className="friends-feed-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={currentUser} />
          ))
        ) : (
          <p className="friends-feed-empty">
            Tus amigos aún no han publicado nada
          </p>
        )}
      </div>

      {/* 🔥 BOTÓN CARGAR MÁS */}
      {hasMore && (
        <button
          className="load-more-btn"
          onClick={loadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Cargando..." : "Cargar más"}
        </button>
      )}
    </div>
  );
}
