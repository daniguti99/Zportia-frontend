import { useState } from "react";
import type { User } from "../../interfaces/interfaces";
import ProfileHeader from "./ProfileHeader";
import ProfilePostsGrid from "./ProfilePostsGrid";
import "./ProfileButtons.css";
import { unfollowUser } from "../../services/ProfileService";

interface ProfileFollowingProps {
  user: User;
}

export default function ProfileFollowing({ user }: ProfileFollowingProps) {
  const [loading, setLoading] = useState(false);

  async function handleUnfollow() {
    try {
      setLoading(true);
      await unfollowUser(user.id);
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
          className="btn-following"
          onClick={handleUnfollow}
          disabled={loading}
        >
          {loading ? "..." : "Siguiendo"}
        </button>
      </div>

      <ProfilePostsGrid posts={user.posts ?? []} />

    </div>
  );
}
