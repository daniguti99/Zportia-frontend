import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import type { PostResponse } from "../interfaces/interfaces";
import { getExplorePosts } from "../services/PostServices";
import "../css/explore/explore.css";

import SportDropdown from "../components/Explore/SportDropdown";
import SearchInput from "../components/Explore/SearchInput";
import { useAuth } from "../hooks/useAuth";

export default function Explore() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostResponse[]>([]);
  const [selectedSport, setSelectedSport] = useState("");

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user: currentUser } = useAuth();

  // 🔥 Cargar primera página SIN useRef
  useEffect(() => {
    init();
  }, []);

  async function init() {
    try {
      const data = await getExplorePosts(0, 10);

      setPosts(data.content);
      setFilteredPosts(data.content);

      setPage(1);
      setHasMore(!data.last);

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

      const data = await getExplorePosts(page, 10);

      setPosts(prev => [...prev, ...data.content]);

      if (!selectedSport) {
        setFilteredPosts(prev => [...prev, ...data.content]);
      }

      if (data.last) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }

    } catch (err: any) {
      setError(err.message || "No se pudieron cargar las publicaciones 😔");
    } finally {
      setLoadingMore(false);
    }
  }

  // 🔥 Filtrar por deporte
  useEffect(() => {
    if (!selectedSport) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.sport === selectedSport));
    }
  }, [selectedSport, posts]);

  if (loading)
    return <p className="explore-loading">Explorando...</p>;

  if (error)
    return <p className="explore-error">{error}</p>;

  return (
    <div className="explore-wrapper">

      <aside className="explore-sidebar">
        <SearchInput />
      </aside>

      <div className="explore-container">
        <h1 className="explore-title">Explorar</h1>

        <div className="explore-feed">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
              />
            ))
          ) : (
            <div className="no-posts-message">
              <p className="no-posts-icon">📭</p>
              <h3>No hay publicaciones disponibles</h3>
              <p className="no-posts-text">
                Intenta con otro deporte o busca diferentes palabras clave
              </p>
            </div>
          )}
        </div>

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

      <aside className="explore-sidebar-right">
        <SportDropdown
          selectedSport={selectedSport}
          onChange={setSelectedSport}
        />
      </aside>

    </div>
  );
}
