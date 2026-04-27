import PostCard from "../PostCard";
import "../../css/profilePage/PostModal.css";
import type { PostResponse } from "../../interfaces/interfaces";

export default function PostModal({ post, onClose }: { post: PostResponse; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Aquí va tu PostCard */}
        <PostCard post={post} />
      </div>
    </div>
  );
}
