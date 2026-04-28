import { useContext, useState } from "react";
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

export default function PostCard({ post, currentUser }: { post: PostResponse; currentUser: User | null }) {

  const { user } = useContext(ZportiaContext) || {};
  const currentUserId = currentUser?.id || user?.id;
  const navigate = useNavigate();

  // LIKE
  const [liked, setLiked] = useState(post.likedByCurrentUser);
  const [likesCount, setLikesCount] = useState(post.reactionsCount);
  const [errorLike, setErrorLike] = useState<string | null>(null);

  // COMENTARIOS
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState<string | null>(null);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);

  // AÑADIR COMENTARIO
  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [sendingComment, setSendingComment] = useState(false);
  const [errorNewComment, setErrorNewComment] = useState<string | null>(null);

  // LISTA DE LIKES
  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState<LikeUser[]>([]);
  const [loadingLikes, setLoadingLikes] = useState(false);
  const [errorLikes, setErrorLikes] = useState<string | null>(null);

  const [value, setValue] = useState("");

  console.log("post.userId:", post.userId);
  console.log("currentUserId:", currentUserId);


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
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#ff006e",
      });
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


  // ENVIAR NUEVO COMENTARIO
  async function handleAddComment() {
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


  // ELIMINAR COMENTARIO
  async function handleDeleteComment(commentId: number) {
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

    if (!result.isConfirmed) return;

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

  function handleSelectedUser(userId: number) {
    navigate(`/profile/${userId}`);
  }

  async function handleDeletePost() {
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
      await deletePost(post.id);

      await Swal.fire({
        title: "Eliminada",
        text: "Tu publicación ha sido eliminada",
        icon: "success",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#0099ff",
      });

      // Si estás en un modal → ciérralo
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
      <div className="post-card">

        {/* PAPELERA */}
        {post.userId === currentUserId && (
          <span
            className="delete-post-btn"
            onClick={handleDeletePost}
          >
            🗑️
          </span>
        )}

        {/* HEADER */}
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
          <img src={post.media} alt="post" className="post-media" />
        )}

        {post.location && (
          <p className="post-location">📍 {post.location}</p>
        )}

        <div className="post-footer">

          {/*❤️*/}
          <span className={liked ? "liked" : ""} onClick={handleToggleLike}>
            ❤️ {likesCount}
          </span>

          {/*👀*/}
          <span onClick={openLikes} className="likes-list-button">
            👀
          </span>

          {/*💬*/}
          <span onClick={openComments} className="comments-button">
            💬 {commentsCount}
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

                      <div className="comment-body">
                        <p className="comment-username">{c.username}</p>
                        <p className="comment-content">{c.text}</p>
                      </div>

                      {/* SOLO SI ES TUYO */}
                      {c.userId === currentUserId && (
                        <span
                          className="delete-comment-btn"
                          onClick={() => handleDeleteComment(c.id)}
                        >
                          🗑️
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No hay comentarios aún</p>
                )}

                {/* BOTÓN AÑADIR COMENTARIO */}
                {!showAddComment && (
                  <button
                    className="add-comment-btn"
                    onClick={() => setShowAddComment(true)}
                  >
                    ➕ Añadir comentario
                  </button>
                )}

                {/* FORMULARIO DE NUEVO COMENTARIO */}
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
