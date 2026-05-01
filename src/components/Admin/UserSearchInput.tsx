import { useState, useEffect } from "react";
import { getUserDetailsAdmin } from "../../services/AdminService";
import "../../css/admin/userSearch.css";
import type { UserDetailsAdminDTO } from "../../interfaces/interfaces";


export default function UserSearchInput({ onSelect }: { onSelect: (user: UserDetailsAdminDTO) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserDetailsAdminDTO[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const user = await getUserDetailsAdmin(query);

        // El endpoint devuelve UN usuario → lo convertimos en array
        setResults([user]);
        setShowDropdown(true);

      } catch (err) {
        console.error("Error buscando usuario admin:", err);
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="search-input-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar usuario por ID o username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setShowDropdown(true)}
      />

      {showDropdown && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((u) => (
            <div
              key={u.id}
              className="search-item"
              onClick={() => {
                onSelect(u);
                setShowDropdown(false);
                setQuery("");
              }}
            >
              {u.photo ? (
                <img src={u.photo} className="search-avatar" />
              ) : (
                <div className="search-avatar placeholder"></div>
              )}

              <div className="search-info">
                <p className="search-username">@{u.username}</p>
                <p className="search-name">{u.firstName} {u.lastName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
