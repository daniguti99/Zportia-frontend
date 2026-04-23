import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/UserServices";
import "../../css/explore/inputExplore.css";
import type { SimpleUser } from "../../interfaces/interfaces";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const [filtered, setFiltered] = useState<SimpleUser[]>([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // Cargar usuarios minimal
  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      }
    }
    loadUsers();
  }, []);

  // Filtrar por username
  useEffect(() => {
    if (!value.trim()) {
      setFiltered([]);
      setOpen(false);
      return;
    }

    const results = users.filter((u) =>
      u.username.toLowerCase().includes(value.toLowerCase())
    );

    //Carga los 6 primeros elementos del array
    setFiltered(results.slice(0, 6));
    setOpen(true);
  }, [value, users]);

  const handleSelect = (userId: number) => {
    navigate(`/profile/${userId}`);
    setValue("");
    setOpen(false);
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar por username..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <circle cx="11" cy="11" r="8" stroke="#d6d6e6" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#d6d6e6" />
        </svg>
      </div>

      {open && filtered.length > 0 && (
        <div className="search-results">
          {filtered.map((u) => (
            <div
              key={u.id}
              className="search-result-item"
              onClick={() => handleSelect(u.id)}
            >
              <img
                src={u.photo || "/default-avatar.png"}
                alt=""
                className="search-result-avatar"
              />
              <span>{u.username}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
