import type { User } from "../../interfaces/interfaces";
import "../../css/profilePage/ProfileButtons.css";
import "../../css/profilePage/ProfileComponents.css";
import ProfileHeader from "./ProfileHeader";
import ProfilePostsGrid from "./ProfilePostsGrid";
import { Link } from "react-router-dom";
import "../../css/profilePage/ProfileFollowing.css";

interface ProfileFollowingProps {
  user: User;
  isOwnProfile: boolean;
  posts: { id: number; photo: string }[];
  postsLoading: boolean;
  onPostClick: (id: number) => void;
  showCreateButton?: boolean;
}

export default function ProfileFollowing({
  user,
  isOwnProfile,
  posts,
  postsLoading,
  onPostClick,
  showCreateButton
}: ProfileFollowingProps) {
  return (
    <div className="profile-container">

      <ProfileHeader user={user} isOwnProfile={isOwnProfile} />

      {/* 🔥 BLOQUE DE BOTONES SOLO SI ES MI PERFIL */}
      {isOwnProfile && (
        <div className="profile-actions">
          <Link to="/edit-profile?mode=profile" className="profile-action-btn">
            Editar perfil
          </Link>

          <Link to="/edit-profile?mode=photo" className="profile-action-btn">
            Cambiar foto
          </Link>

          <Link to="/edit-profile?mode=password" className="profile-action-btn">
            Cambiar contraseña
          </Link>
        </div>
      )}

      <ProfilePostsGrid
        posts={posts}
        loading={postsLoading}
        onPostClick={onPostClick}
        showCreateButton={showCreateButton}
      />
    </div>
  );
}
