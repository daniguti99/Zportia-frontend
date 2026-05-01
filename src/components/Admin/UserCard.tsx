import "../../css/admin/userCard.css";
import type { UserDetailsAdminDTO } from "../../interfaces/interfaces";

interface UserCardProps {
  user: UserDetailsAdminDTO
}

export default function UserCard({ user }: UserCardProps) {
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
      <div className="admin-user-status">
        <span className={`status-badge status-${user.status?.toLowerCase() || "active"}`}>
          {user.status || "ACTIVE"}
        </span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="admin-user-actions">

        <button className="admin-btn danger">Eliminar</button>
        <button className="admin-btn warning">Bloquear</button>
        <button className="admin-btn success">Activar</button>
        <button className="admin-btn info">Desbloquear</button>
        <button className="admin-btn recover">Recuperar</button>

      </div>

    </div>
  );
}
