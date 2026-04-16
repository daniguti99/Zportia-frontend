import "./ProfilePostsGrid.css";

interface ProfilePostsGridProps {
  posts: { id: number; imageUrl: string }[];
}

export default function ProfilePostsGrid({ posts }: ProfilePostsGridProps) {
  return (
    <div className="posts-grid">
      {posts.length === 0 && (
        <p className="no-posts">Este usuario aún no tiene publicaciones</p>
      )}

      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <img src={post.imageUrl} alt="post" />
        </div>
      ))}
    </div>
  );
}
