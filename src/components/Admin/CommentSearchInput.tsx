import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../../css/admin/userSearch.css";
import type { AdminCommentResponse } from "../../interfaces/interfaces";
import { getCommentByIdAdmin } from "../../services/AdminService";

export default function CommentSearchInput({ onSelect }: { onSelect: (c: AdminCommentResponse) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AdminCommentResponse[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const comment = await getCommentByIdAdmin(Number(query));

        setResults([comment]);
        setShowDropdown(true);

      } catch (err: any) {
        Swal.fire({
          title: "Error",
          text: err.message || "No se encontró el comentario",
          icon: "error",
          background: "#111",
          color: "#fff",
          confirmButtonColor: "#ff006e",
        });

        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="search-input-wrapper">
      <input
        type="number"
        className="search-input"
        placeholder="Buscar comentario por ID..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setShowDropdown(true)}
      />

      {showDropdown && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((c) => (
            <div
              key={c.id}
              className="search-item"
              onClick={() => {
                onSelect(c);
                setShowDropdown(false);
                setQuery("");
              }}
            >
              <img src={c.userPhoto} className="search-avatar" />

              <div className="search-info">
                <p className="search-username">@{c.username}</p>
                <p className="search-name">Comentario #{c.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
