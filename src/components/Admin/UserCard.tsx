import "../../css/admin/userCard.css";
import type { UserDetailsAdminDTO } from "../../interfaces/interfaces";

interface UserCardProps {
  user: UserDetailsAdminDTO;
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

      {/* STATUS + ROLE + LEVEL */}
      <div className="admin-user-status-section">

        <span className={`status-badge status-${user.status?.toLowerCase()}`}>
          {user.status}
        </span>

        <span className="role-badge">
          Rol: {user.role}
        </span>

        <span className="level-badge">
          Nivel: {user.level}
        </span>

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

        <button className="admin-btn danger">Eliminar</button>
        <button className="admin-btn warning">Bloquear</button>
        <button className="admin-btn success">Activar</button>
        <button className="admin-btn info">Desbloquear</button>
        <button className="admin-btn recover">Recuperar</button>

      </div>

    </div>
  );
}
