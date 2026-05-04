import "../../css/admin/userCard.css";
import Swal from "sweetalert2";
import type { AdminPostResponse } from "../../interfaces/interfaces";

import {
  deletePostAdmin,
  getPostByIdAdmin
} from "../../services/AdminService";

interface PostCardProps {
  post: AdminPostResponse;
  onUpdate: (updated: AdminPostResponse | null) => void;
}

export default function PostCardAdmin({ post, onUpdate }: PostCardProps) {

  async function handleDelete() {
    const ok = await Swal.fire({
      title: "¿Eliminar publicación?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      background: "#111",
      color: "#fff",
    });

    if (!ok.isConfirmed) return;

    await deletePostAdmin(post.id);

    await Swal.fire({
      title: "Publicación eliminada",
      icon: "success",
      background: "#111",
      color: "#fff",
    });

    onUpdate(null);
  }

  return (
    <div className="admin-user-card">

      {/* HEADER */}
      <div className="admin-user-header">
        <img
          src={post.media || "/default-post.png"}
          className="admin-user-avatar"
        />

        <div className="admin-user-info">
          <h2 className="admin-user-name">Post #{post.id}</h2>
          <p className="admin-user-username">@{post.username}</p>
          <p className="admin-user-id">ID Usuario: {post.userId}</p>
        </div>
      </div>

      {/* INFO */}
      <div className="admin-user-extra">
        <p><strong>Contenido:</strong> {post.content}</p>
        <p><strong>Fecha:</strong> {post.date}</p>
        <p><strong>Deporte:</strong> {post.sport}</p>
        {post.location && <p><strong>Ubicación:</strong> {post.location}</p>}
      </div>

      {/* ACTION BUTTONS */}
      <div className="admin-user-actions">
        <button className="admin-btn danger" onClick={handleDelete}>
          Eliminar publicación
        </button>
      </div>

    </div>
  );
}
