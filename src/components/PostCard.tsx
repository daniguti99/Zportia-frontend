// components/PostCard.tsx
import type { PostResponse } from "../interfaces/interfaces";


export default function PostCard({ post }: { post: PostResponse }) {
  return (
    <div className="post-card">
      
      {/* HEADER */}
      <div className="post-header">
        <img
          src={post.userPhoto}
          alt={post.username}
          className="post-avatar"
        />

        <div>
          <p className="post-username">{post.username}</p>
          <span className="post-date">{post.date}</span>
        </div>
      </div>

      {/* CONTENT */}
      <p className="post-content">{post.content}</p>

      {/* MEDIA */}
      {post.media && (
        <img src={post.media} alt="post" className="post-media" />
      )}

      {/* LOCATION */}
      {post.location && (
        <p className="post-location">📍 {post.location}</p>
      )}

      {/* FOOTER */}
      <div className="post-footer">
        <span className={post.likedByCurrentUser ? "liked" : ""}>
          ❤️ {post.reactionsCount}
        </span>

        <span>💬 {post.commentsCount}</span>
      </div>
    </div>
  );
}