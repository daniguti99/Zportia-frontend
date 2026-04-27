import type { User } from "../../interfaces/interfaces";
import "../../css/profilePage/ProfileButtons.css";
import "../../css/profilePage/ProfileComponents.css";
import ProfileHeader from "./ProfileHeader";
import ProfilePostsGrid from "./ProfilePostsGrid";

interface ProfileFollowingProps {
  user: User;
  isOwnProfile: boolean;
  posts: { id: number; photo: string }[];
  postsLoading: boolean;
  onPostClick: (id: number) => void;
  showCreateButton?: boolean;

}

export default function ProfileFollowing({ user, isOwnProfile, posts, postsLoading, onPostClick, showCreateButton }: ProfileFollowingProps) {
  return (
    <div className="profile-container">

      <ProfileHeader user={user} isOwnProfile={isOwnProfile} />

      <ProfilePostsGrid
        posts={posts}
        loading={postsLoading}
        onPostClick={onPostClick}
        showCreateButton={showCreateButton}
      />

    </div>
  );
}
