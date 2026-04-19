import { useState } from "react";
import type { User } from "../../interfaces/interfaces";
import ProfileHeader from "./ProfileHeader";
import ProfilePostsGrid from "./ProfilePostsGrid";
import "../../css/profilePage/ProfileButtons.css";
import { followUser } from "../../services/ProfileService";

interface ProfilePublicProps {
  user: User;
  posts: { id: number; media: string }[];
  postsLoading: boolean;
  onPostClick: (id: number) => void;
}

export default function ProfilePublic({ user, posts, postsLoading, onPostClick }: ProfilePublicProps) {
  const [loading, setLoading] = useState(false);

  async function handleFollow() {
    try {
      setLoading(true);
      await followUser(user.id);
      window.location.reload(); // temporal
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="profile-container">

      <ProfileHeader user={user} />

      <div className="profile-actions">
        <button
          className="btn-follow"
          onClick={handleFollow}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Seguir"}
        </button>
      </div>

      <ProfilePostsGrid
        posts={posts}
        loading={postsLoading}
        onPostClick={onPostClick}
      />

    </div>
  );
}
