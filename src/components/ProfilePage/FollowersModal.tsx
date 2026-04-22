import { useEffect } from "react";
import "../../css/profilePage/FollowersModal.css";
import type { SimpleUser } from '../../interfaces/interfaces';

interface FollowersModalProps {
  title: string;
  users: SimpleUser[];
  onClose: () => void;
}

export default function FollowersModal({ title, users, onClose }: FollowersModalProps) {

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="followers-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="followers-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="followers-header">
          <h2 className="followers-title">{title}</h2>
          <button className="close-icon" onClick={onClose}>✕</button>
        </div>

        {/* LISTA */}
        <div className="followers-list">
          {users.map((u) => (
            <div key={u.id} className="follower-item">
              <img
                src={u.photo ?? "/assets/default-profile.png"}
                alt={u.username}
                className="follower-photo"
              />
              <span className="follower-username">{u.username}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
