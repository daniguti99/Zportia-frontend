import "../../css/admin/userCard.css";
import Swal from "sweetalert2";
import type { UserDetailsAdminDTO } from "../../interfaces/interfaces";

import {
  deleteUser,
  blockUser,
  activateUser,
  unlockUser,
  recoverUser,
  getUserDetailsAdmin
} from "../../services/AdminService";

interface UserCardProps {
  user: UserDetailsAdminDTO;
  onUpdate: (updated: UserDetailsAdminDTO) => void;
}

export default function UserCard({ user, onUpdate }: UserCardProps) {

  // ============================
  //   MÉTODOS INDIVIDUALES
  // ============================

  async function handleDelete() {
    const ok = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: "Esto es un borrado lógico.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      background: "#111",
      color: "#fff",
    });

    if (!ok.isConfirmed) return;

    await deleteUser(user.id);

    const updated = await getUserDetailsAdmin(String(user.id));

    await Swal.fire({
      title: "Usuario eliminado",
      icon: "success",
      background: "#111",
      color: "#fff",
    });

    onUpdate(updated);
  }

  async function handleBlock() {
    const ok = await Swal.fire({
      title: "¿Bloquear usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      background: "#111",
      color: "#fff",
    });

    if (!ok.isConfirmed) return;

    await blockUser(user.id);

    const updated = await getUserDetailsAdmin(String(user.id));

    await Swal.fire({
      title: "Usuario bloqueado",
      icon: "success",
      background: "#111",
      color: "#fff",
    });

    onUpdate(updated);
  }

  async function handleActivate() {
    await activateUser(user.id);

    const updated = await getUserDetailsAdmin(String(user.id));

    await Swal.fire({
      title: "Usuario activado",
      icon: "success",
      background: "#111",
      color: "#fff",
    });

    onUpdate(updated);
  }

  async function handleUnlock() {
    await unlockUser(user.id);

    const updated = await getUserDetailsAdmin(String(user.id));

    await Swal.fire({
      title: "Usuario desbloqueado",
      icon: "success",
      background: "#111",
      color: "#fff",
    });

    onUpdate(updated);
  }

  async function handleRecover() {
    await recoverUser(user.id);

    const updated = await getUserDetailsAdmin(String(user.id));

    await Swal.fire({
      title: "Usuario recuperado",
      icon: "success",
      background: "#111",
      color: "#fff",
    });

    onUpdate(updated);
  }

  // ============================
  //   ESTADOS
  // ============================

  const isActive = user.status === "ACTIVO";
  const isBlocked = user.status === "BLOQUEADO";
  const isDeleted = user.status === "ELIMINADO";

  return (
    <div className="admin-user-card">

      {/* HEADER */}
      <div className="admin-user-header">
        <img
          src={user.photo || "/default-avatar.png"}
          className="admin-user-avatar"
        />

        <div className="admin-user-info">
          <h2 className="admin-user-name">
            {user.firstName} {user.lastName}
          </h2>
          <p className="admin-user-username">@{user.username}</p>
          <p className="admin-user-id">ID: {user.id}</p>
        </div>
      </div>

      {/* STATUS */}
      <div className="admin-user-status-section">
        <span className={`status-badge status-${user.status?.toLowerCase()}`}>
          {user.status}
        </span>
        <span className="role-badge">Rol: {user.role}</span>
        <span className="level-badge">Nivel: {user.level}</span>
        <span className="privacy-badge">
          {user.isPrivate ? "Privado" : "Público"}
        </span>
      </div>

      {/* EXTRA INFO */}
      <div className="admin-user-extra">
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="admin-user-actions">

        {!isDeleted && (
          <button className="admin-btn danger" onClick={handleDelete}>
            Eliminar
          </button>
        )}

        {isActive && (
          <button className="admin-btn warning" onClick={handleBlock}>
            Bloquear
          </button>
        )}

        {isBlocked && (
          <button className="admin-btn success" onClick={handleActivate}>
            Activar
          </button>
        )}

        {isBlocked && (
          <button className="admin-btn info" onClick={handleUnlock}>
            Desbloquear
          </button>
        )}

        {isDeleted && (
          <button className="admin-btn recover" onClick={handleRecover}>
            Recuperar
          </button>
        )}

      </div>

    </div>
  );
}
