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

function getVideoThumbnail(url: string) {
  if (!url.includes("/video/")) return url;

  return url
    .replace("/upload/", "/upload/so_1/")
    .replace(/\.(mp4|webm|mov)$/i, ".jpg");
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
              {post.photo.includes("/video/") ? (
                <div className="profile-video-thumb">
                  <img
                    src={getVideoThumbnail(post.photo)}
                    alt="video thumbnail"
                    className="post-thumb"
                  />
                  <span className="play-icon">▶</span>
                </div>
              ) : (
                <img
                  src={post.photo}
                  alt="post"
                  className="post-thumb"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
