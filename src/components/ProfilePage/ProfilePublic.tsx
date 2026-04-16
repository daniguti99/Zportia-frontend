import type { User } from "../../interfaces/interfaces";
import ProfileHeader from "./ProfileHeader";


interface ProfilePublicProps {
  user: User;
}

export default function ProfilePublic({ user }: ProfilePublicProps) {
  return (
    <div className="profile-container">

      <ProfileHeader user={user} />

      <div className="profile-actions">
        <button className="btn-follow">Seguir</button>
      </div>

      <div className="profile-posts-grid">
        <p>Grid de publicaciones (público)</p>
      </div>

    </div>
  );
}
