import "../../css/profilePage/BlockedPages.css";
import { unblockUser } from "../../services/ProfileService";
import { useState } from "react";

interface BlockedByMePageProps {
  userId: number;
  username: string;
  photo: string | null;
}

export default function BlockedByMePage({ userId, username, photo }: BlockedByMePageProps) {
  const [loading, setLoading] = useState(false);

  async function handleUnblock() {
    try {
      setLoading(true);
      await unblockUser(userId);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="blocked-page-container">
      <div className="blocked-card">

        <img
          src={photo ?? "/assets/default-profile.png"}
          alt="Foto de perfil"
          className="blocked-profile-photo"
        />

        <h2 className="blocked-title">Has bloqueado a @{username}</h2>

        <p className="blocked-text">
          No puedes ver su contenido mientras permanezca bloqueado.
        </p>

        <button
          className="btn-unblock"
          onClick={handleUnblock}
          disabled={loading}
        >
          {loading ? "Desbloqueando..." : "Desbloquear usuario"}
        </button>

      </div>
    </div>
  );
}
