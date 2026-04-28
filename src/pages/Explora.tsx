// pages/Explore.tsx
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import type { PostResponse } from "../interfaces/interfaces";
import { getExplorePosts } from "../services/PostServices";
import "../css/explore/explore.css";

import SportDropdown from "../components/Explore/SportDropdown";
import SearchInput from "../components/Explore/SearchInput";

export default function Explore() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostResponse[]>([]);
  const [selectedSport, setSelectedSport] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getExplorePosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err: any) {
        setError(err.message || "No se pudieron cargar las publicaciones 😔");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  // FILTRAR SOLO POR DEPORTE
  useEffect(() => {
    let filtered = posts;

    if (selectedSport) {
      filtered = filtered.filter((p) => p.sport === selectedSport);
    }

    setFilteredPosts(filtered);
  }, [selectedSport, posts]);

  if (loading) return <p className="explore-loading">Explorando...</p>;
  if (error) return <p className="explore-error">{error}</p>;

  return (
    <div className="explore-wrapper">

      {/* ASIDE IZQUIERDO — BUSCADOR PREMIUM */}
      <aside className="explore-sidebar">
        <SearchInput />
      </aside>

      {/* FEED CENTRAL */}
      <div className="explore-container">
        <h1 className="explore-title">Explorar</h1>

        <div className="explore-feed">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p>No hay publicaciones disponibles</p>
          )}
        </div>
      </div>

      {/* ASIDE DERECHO — DROPDOWN DE DEPORTES */}
      <aside className="explore-sidebar-right">
        <SportDropdown
          selectedSport={selectedSport}
          onChange={setSelectedSport}
        />
      </aside>

    </div>
  );
}
