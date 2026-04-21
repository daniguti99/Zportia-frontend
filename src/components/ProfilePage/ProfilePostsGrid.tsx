import "../../css/profilePage/ProfilePostsGrid.css";

interface ProfilePostsGridProps {
  posts: { id: number; photo: string }[];
  loading?: boolean;
  onPostClick?: (postId: number) => void;
}

export default function ProfilePostsGrid({ posts, loading, onPostClick }: ProfilePostsGridProps) {
  if (loading) {
    return <p className="no-posts">Cargando publicaciones...</p>;
  }

  if (!posts || posts.length === 0) {
    return <p className="no-posts">Este usuario aún no tiene publicaciones</p>;
  }

  return (
    <div className="posts-grid">
      {posts.map((post) => (
        <div 
          key={post.id} 
          className="post-item"
          onClick={() => onPostClick?.(post.id)}
        >
          <img src={post.photo} alt="post" />
        </div>
      ))}
    </div>
  );
}
