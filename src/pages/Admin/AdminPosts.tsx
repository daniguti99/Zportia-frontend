import { useState } from "react";

import type { AdminPostResponse } from "../../interfaces/interfaces";
import PostSearchInput from "../../components/Admin/PostSerachInput";
import PostCardAdmin from "../../components/Admin/PostCardAdmin";


export default function AdminPostsPage() {
  const [selectedPost, setSelectedPost] = useState<AdminPostResponse | null>(null);

  return (
    <div className="admin-users-wrapper">

      <h1 className="admin-title">Gestión de Publicaciones</h1>

      <div className="admin-center-box">
        <PostSearchInput onSelect={setSelectedPost} />

        {selectedPost && (
          <PostCardAdmin
            post={selectedPost}
            onUpdate={setSelectedPost}
          />
        )}
      </div>

    </div>
  );
}
