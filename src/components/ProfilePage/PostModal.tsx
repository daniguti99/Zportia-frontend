import PostCard from "../PostCard";
import "../../css/profilePage/PostModal.css";
import type { PostResponse, User } from "../../interfaces/interfaces";
import { useContext } from "react";
import { ZportiaContext } from "../../context/ZportiaContext";

export default function PostModal({ post, onClose, currentUser }: { post: PostResponse; onClose: () => void; currentUser: User | null }) {
    const { user } = useContext(ZportiaContext) || {};
    const currentUserId = currentUser?.id || user?.id;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Aquí va tu PostCard */}
        <PostCard post={post} currentUser={currentUser} />
      </div>
    </div>
  );
}
