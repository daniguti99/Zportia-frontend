import type { User } from "../../interfaces/interfaces";
import ProfileHeader from "./ProfileHeader";


interface ProfileFollowingProps {
  user: User;
}

export default function ProfileFollowing({ user }: ProfileFollowingProps) {
  return (
    <div className="profile-container">

      <ProfileHeader user={user} />

      <div className="profile-actions">
        <button className="btn-following">Siguiendo</button>
      </div>

      <div className="profile-posts-grid">
        <p>Grid de publicaciones (seguido)</p>
      </div>

    </div>
  );
}
