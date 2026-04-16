import type { User } from "../../interfaces/interfaces";
import ProfileHeader from "./ProfileHeader";


interface ProfilePrivateLockedProps {
  user: User;
}

export default function ProfilePrivateLocked({ user }: ProfilePrivateLockedProps) {
  return (
    <div className="profile-container locked">

      <ProfileHeader user={user} />

      <div className="profile-locked-message">
        <p>Este perfil es privado</p>
        <p>Envía una solicitud para ver sus publicaciones</p>
      </div>

      <div className="profile-actions">
        <button className="btn-request">Solicitar seguir</button>
      </div>

      <div className="profile-posts-grid locked-grid">
        <p>Contenido bloqueado 🔒</p>
      </div>

    </div>
  );
}
