import { useState } from "react";
import type { CommentResponse, PostResponse, LikeUser } from "../interfaces/interfaces";
import "../css/postCard/postCard.css";
import { getCommentsByPost, getLikesByPost } from "../services/PostServices";

export default function PostCard({ post }: { post: PostResponse }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState<string | null>(null);

  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState<LikeUser[]>([]);
  const [loadingLikes, setLoadingLikes] = useState(false);
  const [errorLikes, setErrorLikes] = useState<string | null>(null);

  async function openComments() {
    setShowComments(true);
    setLoadingComments(true);
    setErrorComments(null);

    try {
      const data = await getCommentsByPost(post.id);
      setComments(data);
    } catch (err: any) {
      setErrorComments(err.message || "No se pudieron cargar los comentarios");
    } finally {
      setLoadingComments(false);
    }
  }

  async function openLikes() {
    setShowLikes(true);
    setLoadingLikes(true);
    setErrorLikes(null);

    try {
      const data = await getLikesByPost(post.id);
      setLikes(data);
    } catch (err: any) {
      setErrorLikes(err.message || "No se pudieron cargar los likes");
    } finally {
      setLoadingLikes(false);
    }
  }

  return (
    <>
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
          <span
            className={post.likedByCurrentUser ? "liked" : ""}
            onClick={openLikes}
          >
            ❤️ {post.reactionsCount}
          </span>

          <span onClick={openComments} className="comments-button">
            💬 {post.commentsCount}
          </span>
        </div>
      </div>

      {/* POPUP DE COMENTARIOS */}
      {showComments && (
        <div className="comments-popup">
          <div className="comments-box">
            <button className="close-btn" onClick={() => setShowComments(false)}>
              ✖
            </button>

            <h3>Comentarios</h3>

            {loadingComments && <p>Cargando comentarios...</p>}
            {errorComments && <p className="error">{errorComments}</p>}

            {!loadingComments && !errorComments && (
              <>
                {comments.length > 0 ? (
                  comments.map((c) => (
                    <div key={c.id} className="comment-item">
                      <img src={c.userPhoto} className="comment-avatar" />
                      <div>
                        <p className="comment-username">{c.username}</p>
                        <p className="comment-content">{c.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hay comentarios aún</p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* POPUP DE LIKES */}
      {showLikes && (
        <div className="likes-popup">
          <div className="likes-box">
            <button className="close-btn" onClick={() => setShowLikes(false)}>
              ✖
            </button>

            <h3>Me gusta</h3>

            {loadingLikes && <p>Cargando...</p>}
            {errorLikes && <p className="error">{errorLikes}</p>}

            {!loadingLikes && !errorLikes && (
              <>
                {likes.length > 0 ? (
                  likes.map((u) => (
                    <div key={u.userId} className="like-item">
                      <img src={u.userPhoto} className="like-avatar" />
                      <p className="like-username">{u.username}</p>
                    </div>
                  ))
                ) : (
                  <p>Aún no hay reacciones</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
