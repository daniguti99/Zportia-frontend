import type { User } from "../../interfaces/interfaces";
import ProfileHeader from "./ProfileHeader";
import ProfilePostsGrid from "./ProfilePostsGrid";
import "../../css/profilePage/ProfileButtons.css";
import "../../css/profilePage/ProfileComponents.css";

interface ProfilePublicProps {
  user: User;
  isOwnProfile: boolean;
  posts: { id: number; photo: string }[];
  postsLoading: boolean;
  onPostClick: (id: number) => void;
}

export default function ProfilePublic({ user, isOwnProfile, posts, postsLoading, onPostClick }: ProfilePublicProps) {
  return (
    <div className="profile-container">

      <ProfileHeader user={user} isOwnProfile={isOwnProfile} />

      <ProfilePostsGrid
        posts={posts}
        loading={postsLoading}
        onPostClick={onPostClick}
      />

    </div>
  );
}
