import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getSportByIdAdmin, deleteSportAdmin } from "../../services/AdminService";
import type { SportResponse } from "../../interfaces/interfaces";
import "../../css/admin/userSearch.css";

export default function AdminSearchSport() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SportResponse | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResult(null);
      setShowDropdown(false);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const sport = await getSportByIdAdmin(Number(query));
        setResult(sport);
        setShowDropdown(true);
      } catch (err: any) {
        setResult(null);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  async function handleDelete() {
    if (!result) return;

    const ok = await Swal.fire({
      title: "¿Eliminar deporte?",
      text: `Se eliminará: ${result.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
      background: "#111",
      color: "#fff",
    });

    if (!ok.isConfirmed) return;

    try {
      await deleteSportAdmin(result.id);

      Swal.fire({
        title: "Deporte eliminado",
        icon: "success",
        background: "#111",
        color: "#fff",
      });

      setResult(null);
      setQuery("");
      setShowDropdown(false);

    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        background: "#111",
        color: "#fff",
      });
    }
  }

  return (
    <div className="search-input-wrapper">
      <input
        type="number"
        className="search-input"
        placeholder="Buscar deporte por ID..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => result && setShowDropdown(true)}
      />

      {showDropdown && result && (
        <div className="search-dropdown">
          <div
            className="search-item"
            onClick={() => setShowDropdown(false)}
          >
            <div className="search-avatar placeholder"></div>

            <div className="search-info">
              <p className="search-username">#{result.id}</p>
              <p className="search-name">{result.name}</p>
            </div>
          </div>

          <button
            className="admin-btn danger"
            style={{ width: "90%", margin: "10px auto" }}
            onClick={handleDelete}
          >
            Eliminar deporte
          </button>
        </div>
      )}
    </div>
  );
}
