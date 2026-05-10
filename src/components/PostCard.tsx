import { useContext, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { CommentResponse, PostResponse, LikeUser, User } from "../interfaces/interfaces";
import "../css/postCard/postCard.css";
import {
  getCommentsByPost,
  getLikesByPost,
  toggleLike,
  createComment,
  deleteComment,
  deletePost
} from "../services/PostServices";
import { ZportiaContext } from "../context/ZportiaContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { openReportModal } from "./OpenReportModal";

export default function PostCard({ post, currentUser }: { post: PostResponse; currentUser: User | null }) {

  const { user } = useContext(ZportiaContext) || {};
  const currentUserId = currentUser?.id || user?.id;
  const navigate = useNavigate();

  const [liked, setLiked] = useState(post.likedByCurrentUser);
  const [likesCount, setLikesCount] = useState(post.reactionsCount);
  const [errorLike, setErrorLike] = useState<string | null>(null);
  const [loadingLike, setLoadingLike] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState<string | null>(null);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);

  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [sendingComment, setSendingComment] = useState(false);
  const [errorNewComment, setErrorNewComment] = useState<string | null>(null);

  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState<LikeUser[]>([]);
  const [loadingLikes, setLoadingLikes] = useState(false);
  const [errorLikes, setErrorLikes] = useState<string | null>(null);

  const [loadingDeletePost, setLoadingDeletePost] = useState(false);
  const [loadingDeleteComment, setLoadingDeleteComment] = useState<number | null>(null);

  const postCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showComments || showLikes) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showComments, showLikes]);

  async function handleToggleLike() {
    if (loadingLike) return;
    setLoadingLike(true);
    setErrorLike(null);

    try {
      const updatedPost = await toggleLike(post.id);
      setLiked(updatedPost.likedByCurrentUser);
      setLikesCount(updatedPost.reactionsCount);
    } catch (err: any) {
      const msg = err.message || "Error al dar like";
      setErrorLike(msg);
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ff006e",
      });
    } finally {
      setLoadingLike(false);
    }
  }

  async function openComments() {
    if (loadingComments) return;
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

  async function handleAddComment() {
    if (sendingComment) return;
    setSendingComment(true);
    setErrorNewComment(null);

    try {
      const created = await createComment(post.id, newComment);
      setComments((prev) => [...prev, created]);
      setCommentsCount((prev) => prev + 1);
      setNewComment("");
      setShowAddComment(false);
    } catch (err: any) {
      setErrorNewComment(err.message || "Error al enviar comentario");
    } finally {
      setSendingComment(false);
    }
  }

  async function handleDeleteComment(commentId: number) {
    if (loadingDeleteComment) return;
    setLoadingDeleteComment(commentId);

    const result = await Swal.fire({
      title: "¿Eliminar comentario?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff006e",
      cancelButtonColor: "#444",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#111",
      color: "#fff",
    });

    if (!result.isConfirmed) {
      setLoadingDeleteComment(null);
      return;
    }

    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
      setCommentsCount(prev => prev - 1);
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message || "No se pudo eliminar el comentario",
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ff006e",
      });
    } finally {
      setLoadingDeleteComment(null);
    }
  }

  async function openLikes() {
    if (loadingLikes) return;
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

  function handleSelectedUser(userId: number) {
    navigate(`/profile/${userId}`);
  }

  async function handleDeletePost() {
    if (loadingDeletePost) return;

    const result = await Swal.fire({
      title: "¿Eliminar publicación?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff006e",
      cancelButtonColor: "#444",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#111",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      setLoadingDeletePost(true);
      await deletePost(post.id);

      await Swal.fire({
        title: "Eliminada",
        text: "Tu publicación ha sido eliminada",
        icon: "success",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#0099ff",
      });

      if (typeof window !== "undefined" && window.location.pathname.includes("profile")) {
        window.location.reload();
      }

    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ff006e",
      });
    } finally {
      setLoadingDeletePost(false);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }) + " • " + date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  return (
    <>
      <div className="post-card" ref={postCardRef}>

        {post.userId === currentUserId && (
          <div className="post-actions">
            <span
              className="edit-post-btn"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(`/edit/${post.id}`);
              }}
            >
              ✏️
            </span>

            <span
              className="delete-post-btn"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (!loadingDeletePost) handleDeletePost();
              }}
              style={{ opacity: loadingDeletePost ? 0.5 : 1 }}
            >
              🗑️
            </span>
          </div>
        )}

        {post.userId !== currentUserId && (
          <div className="post-actions">
            <span
              className="report-post-btn"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                openReportModal(post.id, "POST");
              }}
            >
              ⚠️
            </span>
          </div>
        )}

        <div className="post-header">
          <img src={post.userPhoto} alt={post.username} className="post-avatar" />

          <div>
            <p className="post-username" onClick={() => handleSelectedUser(post.userId)}>
              {post.username}
            </p>
            <span className="post-date">{formatDate(post.date)}</span>
          </div>
        </div>

        <p className="post-content">{post.content}</p>

        {post.media && (
          post.media.includes("/video/")
            ? (
              <video
                className="post-media"
                src={post.media}
                controls
                autoPlay
                muted
                playsInline
              />
            )
            : (
              <img
                className="post-media"
                src={post.media}
                alt="post"
              />
            )
        )}


        <div className="post-meta-row">
          {post.location && (
            <p className="post-location">📍 {post.location}</p>
          )}

          {post.sport && (
            <p className="post-sport">⚽ {post.sport}</p>
          )}
        </div>

        <div className="post-footer">
          <span
            className={liked ? "liked" : ""}
            onClick={() => !loadingLike && handleToggleLike()}
            style={{ opacity: loadingLike ? 0.5 : 1 }}
          >
            ❤️ {likesCount}
          </span>

          <span
            onClick={() => !loadingLikes && openLikes()}
            className="likes-list-button"
            style={{ opacity: loadingLikes ? 0.5 : 1 }}
          >
            👀
          </span>

          <span
            onClick={() => !loadingComments && openComments()}
            className="comments-button"
            style={{ opacity: loadingComments ? 0.5 : 1 }}
          >
            💬 {commentsCount}
          </span>
        </div>
      </div>

      {showComments && createPortal(
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

                      <div className="comment-body">
                        <p className="comment-username">{c.username}</p>
                        <p className="comment-content">{c.text}</p>
                      </div>

                      {c.userId === currentUserId && (
                        <span
                          className="delete-comment-btn"
                          onClick={() => loadingDeleteComment === null && handleDeleteComment(c.id)}
                          style={{ opacity: loadingDeleteComment === c.id ? 0.5 : 1 }}
                        >
                          🗑️
                        </span>
                      )}

                      {c.userId !== currentUserId && (
                        <span
                          className="report-comment-btn"
                          onClick={() => openReportModal(c.id, "COMMENT")}
                        >
                          ⚠️
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No hay comentarios aún</p>
                )}

                {!showAddComment && (
                  <button
                    className="add-comment-btn"
                    onClick={() => setShowAddComment(true)}
                  >
                    ➕ Añadir comentario
                  </button>
                )}

                {showAddComment && (
                  <div className="add-comment-form">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Escribe un comentario..."
                    />

                    {errorNewComment && <p className="error">{errorNewComment}</p>}

                    <button
                      disabled={sendingComment || newComment.trim().length === 0}
                      onClick={handleAddComment}
                    >
                      {sendingComment ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>,
        document.body
      )}

      {showLikes && createPortal(
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
        </div>,
        document.body
      )}
    </>
  );
}
