import { useState } from "react";
import type { User } from "../../interfaces/interfaces";
import ProfileHeader from "./ProfileHeader";
import "../../css/profilePage/ProfileButtons.css";
import "../../css/profilePage/ProfileComponents.css";
import { followUser } from "../../services/ProfileService";

interface ProfilePrivateLockedProps {
  user: User;
  posts: { id: number; media: string }[];
  postsLoading: boolean;
  onPostClick: (id: number) => void;
}

export default function ProfilePrivateLocked({ user }: ProfilePrivateLockedProps) {
  const [loading, setLoading] = useState(false);

  async function handleRequest() {
    try {
      setLoading(true);
      await followUser(user.id);
      alert("Solicitud enviada");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="profile-container locked">

      <ProfileHeader user={user} />

      <div className="profile-locked-message">
        <p>Este perfil es privado</p>
        <p>Envía una solicitud para ver sus publicaciones</p>
      </div>

      <div className="profile-actions">
        <button
          className="btn-request"
          onClick={handleRequest}
          disabled={loading}
        >
          {loading ? "..." : "Solicitar seguir"}
        </button>
      </div>

      <div className="profile-posts-grid locked-grid">
        <p>Contenido bloqueado 🔒</p>
      </div>

    </div>
  );
}
