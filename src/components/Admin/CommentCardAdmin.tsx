import "../../css/admin/userCard.css";
import Swal from "sweetalert2";
import type { AdminCommentResponse } from "../../interfaces/interfaces";

import { deleteCommentAdmin } from "../../services/AdminService";

interface Props {
  comment: AdminCommentResponse;
  onUpdate: (updated: AdminCommentResponse | null) => void;
}

export default function CommentCardAdmin({ comment, onUpdate }: Props) {

  async function handleDelete() {
    const ok = await Swal.fire({
      title: "¿Eliminar comentario?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      background: "#111",
      color: "#fff",
    });

    if (!ok.isConfirmed) return;

    await deleteCommentAdmin(comment.id);

    await Swal.fire({
      title: "Comentario eliminado",
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
          src={comment.userPhoto}
          className="admin-user-avatar"
        />

        <div className="admin-user-info">
          <h2 className="admin-user-name">Comentario #{comment.id}</h2>
          <p className="admin-user-username">@{comment.username}</p>
          <p className="admin-user-id">ID Usuario: {comment.userId}</p>
          <p className="admin-user-id">ID Post: {comment.postId}</p>
        </div>
      </div>

      {/* INFO */}
      <div className="admin-user-extra">
        <p><strong>Texto:</strong> {comment.text}</p>
        <p><strong>Fecha:</strong> {comment.date}</p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="admin-user-actions">
        <button className="admin-btn danger" onClick={handleDelete}>
          Eliminar comentario
        </button>
      </div>

    </div>
  );
}
