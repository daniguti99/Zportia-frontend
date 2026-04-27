import { useNavigate } from "react-router-dom";
import "../../css/createPost/createPostButton.css";

export default function CreatePostButton() {
  const navigate = useNavigate();

  return (
    <div className="create-post-wrapper">
      <button
        className="create-post-input"
        onClick={() => navigate("/create-post")}
      >
        ➕ Crear publicación
      </button>
    </div>
  );
}
