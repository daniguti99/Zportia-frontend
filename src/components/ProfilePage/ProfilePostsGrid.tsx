import "../../css/profilePage/ProfilePostsGrid.css";
import CreatePostButton from "../Buttons/CreatePostButton";

interface ProfilePostsGridProps {
  posts: { id: number; photo: string }[];
  loading?: boolean;
  onPostClick?: (postId: number) => void;
  showCreateButton?: boolean;
}

export default function ProfilePostsGrid({ posts, loading, onPostClick, showCreateButton }: ProfilePostsGridProps) {
  if (loading) {
    return <p className="no-posts">Cargando publicaciones...</p>;
  }

  return (
    <>
      {/* BOTÓN SOLO SI ES TU PERFIL */}
      {showCreateButton && (
        <div className="profile-create-post-wrapper">
          <CreatePostButton />
        </div>
      )}

      {(!posts || posts.length === 0) ? (
        <p className="no-posts">Este usuario aún no tiene publicaciones</p>
      ) : (
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
      )}
    </>
  );
}
