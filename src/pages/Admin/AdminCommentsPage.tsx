import { useState } from "react";

import type { AdminCommentResponse } from "../../interfaces/interfaces";
import CommentCardAdmin from "../../components/Admin/CommentCardAdmin";
import CommentSearchInput from "../../components/Admin/CommentSearchInput";


export default function AdminCommentsPage() {
  const [selectedComment, setSelectedComment] = useState<AdminCommentResponse | null>(null);

  return (
    <div className="admin-users-wrapper">

      <h1 className="admin-title">Gestión de Comentarios</h1>

      <div className="admin-center-box">
        <CommentSearchInput onSelect={setSelectedComment} />

        {selectedComment && (
          <CommentCardAdmin
            comment={selectedComment}
            onUpdate={setSelectedComment}
          />
        )}
      </div>

    </div>
  );
}
