import { useEffect, useState } from "react";
import { getFriendsPosts } from "../services/PostServices";
import PostCard from "./PostCard";
import type { PostResponse } from "../interfaces/interfaces";
import "../css/home/friendsFeed.css";

export default function FriendsFeed() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getFriendsPosts();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p className="explore-loading">Cargando publicaciones...</p>;
  if (error) return <p className="explore-error">{error}</p>;

  return (
  <div className="friends-feed-container">
    <h1 className="friends-feed-title">Publicaciones de tus amigos</h1>

    {loading && <p className="friends-feed-loading">Cargando publicaciones...</p>}
    {error && <p className="friends-feed-error">{error}</p>}

    {!loading && !error && (
      <div className="friends-feed-list">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="friends-feed-empty">Tus amigos aún no han publicado nada</p>
        )}
      </div>
    )}
  </div>
);


}
