import { useState, useEffect } from "react";
import "../../css/admin/userSearch.css";
import type { AdminPostResponse } from "../../interfaces/interfaces";
import { getPostByIdAdmin } from "../../services/AdminService";

export default function PostSearchInput({ onSelect }: { onSelect: (post: AdminPostResponse) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AdminPostResponse[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const post = await getPostByIdAdmin(Number(query));

        // El endpoint devuelve UN post → lo convertimos en array
        setResults([post]);
        setShowDropdown(true);

      } catch (err) {
        console.error("Error buscando post admin:", err);
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
        placeholder="Buscar publicación por ID..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setShowDropdown(true)}
      />

      {showDropdown && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((p) => (
            <div
              key={p.id}
              className="search-item"
              onClick={() => {
                onSelect(p);
                setShowDropdown(false);
                setQuery("");
              }}
            >
              {p.media ? (
                <img src={p.media} className="search-avatar" />
              ) : (
                <div className="search-avatar placeholder"></div>
              )}

              <div className="search-info">
                <p className="search-username">@{p.username}</p>
                <p className="search-name">Post #{p.id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
