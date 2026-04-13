import { useState } from "react";
import type { CommentResponse, PostResponse, LikeUser } from "../interfaces/interfaces";
import "../css/postCard/postCard.css";
import { getCommentsByPost, getLikesByPost, toggleLike } from "../services/PostServices";

export default function PostCard({ post }: { post: PostResponse }) {

  // ESTADOS PARA LIKE
  const [liked, setLiked] = useState(post.likedByCurrentUser);
  const [likesCount, setLikesCount] = useState(post.reactionsCount);
  const [errorLike, setErrorLike] = useState<string | null>(null);

  // ESTADOS PARA COMENTARIOS
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState<string | null>(null);

  // ESTADOS PARA LISTA DE LIKES
  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState<LikeUser[]>([]);
  const [loadingLikes, setLoadingLikes] = useState(false);
  const [errorLikes, setErrorLikes] = useState<string | null>(null);


  // TOGGLE LIKE
  async function handleToggleLike() {
    setErrorLike(null);

    try {
      const updatedPost = await toggleLike(post.id);

      setLiked(updatedPost.likedByCurrentUser);
      setLikesCount(updatedPost.reactionsCount);

    } catch (err: any) {
      const msg = err.message || "Error al dar like";
      setErrorLike(msg);
      alert(msg); // 🔥 Mostrar error al usuario
    }
  }


  // ABRIR COMENTARIOS
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

  // ABRIR LISTA DE LIKES
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

        <p className="post-content">{post.content}</p>

        {post.media && (
          <img src={post.media} alt="post" className="post-media" />
        )}

        {post.location && (
          <p className="post-location">📍 {post.location}</p>
        )}

        <div className="post-footer">

          {/*❤️*/}
          <span
            className={liked ? "liked" : ""}
            onClick={handleToggleLike}
          >
            ❤️ {likesCount}
          </span>

          {/*👀*/}
          <span onClick={openLikes} className="likes-list-button">
            👀
          </span>

          {/*💬*/}
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
