import "./FollowersModal.css";

interface FollowersModalProps {
  title: string;
  users: { id: number; username: string; photo: string | null }[];
  onClose: () => void;
}

export default function FollowersModal({ title, users, onClose }: FollowersModalProps) {
  return (
    <div className="followers-modal-overlay" onClick={onClose}>
      <div className="followers-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>

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

        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
