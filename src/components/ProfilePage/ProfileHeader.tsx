import type { User } from "../../interfaces/interfaces";
import "../../css/profilePage/ProfileButtons.css";
import "../../css/profilePage/ProfileHeader.css";



interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="profile-header-container">

      {/* FOTO + MARCO */}
      <div className={`profile-photo-wrapper level-${user.level.toLowerCase()}`}>
        <img
          src={user.photo ?? "/assets/default-profile.png"}
          alt="Foto de perfil"
          className="profile-photo"
        />
      </div>

      {/* NOMBRE + USERNAME */}
      <div className="profile-header-info">
        <h2 className="profile-name">
          {user.firstName} {user.lastName}
        </h2>
        <p className="profile-username">{user.username}</p>
      </div>

      {/* DEPORTES */}
      {user.sports && user.sports.length > 0 && (
        <div className="profile-sports">
          {user.sports.map((sport) => (
            <span key={sport} className="sport-badge">
              {sport}
            </span>
          ))}
        </div>
      )}


      {/* STATS */}
      <div className="profile-header-stats">
        <div className="stat">
          <strong>{user.postsCount}</strong>
          <span>Publicaciones</span>
        </div>
        <div className="stat">
          <strong>{user.followersCount}</strong>
          <span>Seguidores</span>
        </div>
        <div className="stat">
          <strong>{user.followingCount}</strong>
          <span>Seguidos</span>
        </div>
      </div>

    </div>
  );
}
